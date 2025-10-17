import { CostumerProps } from "./costumer";

export interface TicketProps{
    name: string;
    id: string;
    created_at: Date | null;
    updated_at: Date | null;
    user_id: string | null;
    description: string;
    status: string;
    costumer_id: string | null;
    costumer: CostumerProps | null;
}