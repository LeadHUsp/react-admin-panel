import { LoadingStatus } from '../../../types';
export interface AttributeGroup {
    _id: string;
    name_user: string;
    name_admin: string;
    show_in_filter: boolean;
    unit_text: string;
    category: { name: string };
    attribute: Attribute[];
}
export interface Attribute {
    _id?: string;
    value: string;
    slug: string;
    attribute_group: AttributeGroup;
}
export interface AttributeState {
    attr_group: Array<AttributeGroup>;
    attr_group_ids: string[];
    current_page: number;
    total_pages: number;
    choosed_items: string[];
    delete_single_item_id: string | null;
    open_confirm_dialog: boolean;
    status: LoadingStatus;
}
