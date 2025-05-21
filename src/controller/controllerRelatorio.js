const Voo = require('../model/modelVoo');
const Passageiro = require('../model/modelPassageiro');

exports.getRelatorioVoosHoje = async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setUTCHours(0, 0, 0, 0); 
    const amanha = new Date(hoje);
    amanha.setUTCDate(hoje.getUTCDate() + 1); 

    const relatorio = await Voo.aggregate([
      {
        $match: {
          dataHoraPartida: {
            $gte: hoje,
            $lt: amanha
          }
        }
      },
      {
        $lookup: {
          from: 'passageiros',
          localField: 'numeroVoo',
          foreignField: 'vooId', 
          as: 'passageirosDetalhes'
        }
      },

      {
        $project: {
          _id: 1,
          numeroVoo: 1,
          origem: 1,
          destino: 1,
          dataHoraPartida: 1,
          portaoAtribuidoVoo: '$portaID',
          statusVoo: '$status',
          passageiros: {
            $map: {
              input: '$passageirosDetalhes',
              as: 'passageiro',
              in: {
                nome: '$$passageiro.nome',
                cpf: '$$passageiro.cpf',
                statusCheckin: '$$passageiro.statusCheckin',
                portaoAtribuido: '$portaoId' 
              }
            }
          }
        }
      }
    ]);

    if (relatorio.length === 0) {
      return res.status(200).json({ message: "Nenhum voo programado para hoje.", data: [] });
    }

    res.status(200).json(relatorio);

  } catch (error) {
    console.error("Erro ao gerar relatório de voos:", error);
    res.status(500).json({ message: "Erro interno do servidor ao gerar relatório.", error: error.message });
  }
};