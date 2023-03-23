export interface ParamsInterface {
  id?: number;
  ju_associado?: string;
  ju_sequencia?: string;
  ju_servico_id?: number;
  ju_horario_id?: number;
  where?: any;
  include?: any;
  count?: boolean;
  limit?: number;
  offset?: number;
  order_by?: any;
  group_by?: any;
  position?: number;
  select?: any;
  new_ordering?: boolean;
  debug?: boolean;
  notified?: boolean;
  not_notified?: boolean;
}
