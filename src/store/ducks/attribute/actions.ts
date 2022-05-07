import { AttributeGroup, AttributeState } from './contracts/state';
import {
    AttributeActionType,
    FetchAttributeGroupDataActionInterface,
    SetAttributeGroupDataActionInterface,
    SetAttributeLoadingStatus,
    SetCurrentPageActionInterface,
    SetTotalPagesActionInterface,
    IFetchDeleteSingleAttribute,
    ISetChoosedItems,
    ISetAttributeGroupIds,
    IConfirmDeleteSingleItem,
    ICloseConfirmDialog,
} from './contracts/types';

export const fetchAttributeGroupData = (
    str?: string,
    page?: number
): FetchAttributeGroupDataActionInterface => ({
    type: AttributeActionType.FETCH_ATTRIBUTE_GROUP_DATA,
    str,
    page,
});
export const fetchDeleteSingleGroupData = (
    payload: string,
    str?: string,
    page?: number
): IFetchDeleteSingleAttribute => ({
    type: AttributeActionType.FETCH_DELETE_ATTRIBUTE_GROUP_SINGLE,
    payload,
    str,
    page,
});
export const setAttributeGroupData = (
    payload: Array<AttributeGroup>
): SetAttributeGroupDataActionInterface => ({
    type: AttributeActionType.SET_ATTRIBUTE_GROUP_DATA,
    payload,
});
export const setAttributeGroupIds = (payload: string[]): ISetAttributeGroupIds => ({
    type: AttributeActionType.SET_ATTRIBUTE_GROUP_IDS,
    payload,
});
export const setCurrentPage = (payload: number): SetCurrentPageActionInterface => ({
    type: AttributeActionType.SET_CURRENT_PAGE,
    payload,
});
export const setTotalPages = (payload: number): SetTotalPagesActionInterface => ({
    type: AttributeActionType.SET_TOTAL_PAGES,
    payload,
});

export const setAttributeLoadingStatus = (
    payload: AttributeState['status']
): SetAttributeLoadingStatus => ({
    type: AttributeActionType.SET_ATTRIBUTE_LOADING_STATUS,
    payload,
});
export const setChoosedItems = (payload: string[]): ISetChoosedItems => ({
    type: AttributeActionType.SET_CHOOSED_ITEMS,
    payload,
});
export const confirmDeleteSingleItem = (payload: string): IConfirmDeleteSingleItem => ({
    type: AttributeActionType.CONFIRM_DELETE_SINGLE,
    payload,
});
export const closeConfirmDialog = (): ICloseConfirmDialog => ({
    type: AttributeActionType.CLOSE_CONFIRM_DIALOG,
});
