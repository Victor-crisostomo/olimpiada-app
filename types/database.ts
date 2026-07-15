export interface Jogo {
  id_jogo: string;
  created_at?: string;
  data?: string | null;
  hora?: string | null;
  local?: string | null;
  modalidade: string;
  fase: string;
  equipe_a?: string | null;
  equipe_b?: string | null;
  placar_a?: string | null;
  placar_b?: string | null;
  vencedor?: string | null;
  status: string;
}

export interface RankingItem {
  id?: string;
  turma: string;
  pontos: number;
  ouros: number;
  pratas: number;
  bronzes: number;
}