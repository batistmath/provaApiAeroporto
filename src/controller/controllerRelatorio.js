const Voo = require('../model/modelVoo');
const Passageiro = require('../model/modelPassageiro');

exports.getRelatorioVoosHoje = async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setUTCHours(0, 0, 0, 0); // Ajusta para o início do dia em UTC
    const amanha = new Date(hoje);
    amanha.setUTCDate(hoje.getUTCDate() + 1); // Avança um dia em UTC

    const relatorio = await Voo.aggregate([
      // Stage 1: Filtrar os voos para o dia atual
      {
        $match: {
          dataHoraPartida: {
            $gte: hoje,
            $lt: amanha
          }
        }
      },
      // Stage 2: Fazer o "join" com a coleção de passageiros
      {
        $lookup: {
          from: 'passageiros',
          localField: 'numeroVoo',
          foreignField: 'vooId', // **CAMPO CORRIGIDO: 'vooId' (com 'i' minúsculo no final)**
          as: 'passageirosDetalhes'
        }
      },
      // Stage 3: Projetar (formatar) a saída
      {
        $project: {
          _id: 1,
          numeroVoo: 1,
          origem: 1,
          destino: 1,
          dataHoraPartida: 1,
          portaoAtribuidoVoo: '$portaID', // Mantemos o portão no nível do voo se desejar
          statusVoo: '$status',
          passageiros: {
            $map: {
              input: '$passageirosDetalhes',
              as: 'passageiro',
              in: {
                nome: '$$passageiro.nome',
                cpf: '$$passageiro.cpf',
                statusCheckin: '$$passageiro.statusCheckin',
                // AQUI ESTÁ A MUDANÇA: Incluímos o portaID do voo dentro de cada passageiro
                portaoAtribuido: '$portaoId' // Referencia o portaID do documento Voo original
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