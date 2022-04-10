import { LoadingStatus } from 'store/types';
import { UploadedFile } from 'components/DropLoader/DropLoader';

export interface GalleryItem {
    _id: string;
    name: string;
    alt: string;
    title: string;
    size: string;
    width: string;
    height: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
}
export interface ChoosedItem {
    [key: string]: GalleryItem;
}
export interface GalleryState {
    gallery_items: Array<GalleryItem>;
    new_gallery_items: UploadedFile[];
    status: LoadingStatus;
    choosed_items: ChoosedItem;
    total_pages: number;
    edit_gallery_item: GalleryItem;
    change_not_saved: boolean;
    open_gallery_modal: boolean;
    current_page: number | null;
}
