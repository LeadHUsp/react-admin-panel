import { AttributeGroup, AttributeState } from './contracts/state';
import {
    AttributeActionType,
    FetchAttributeGroupDataActionInterface,
    SetAttributeGroupDataActionInterface,
    SetAttributeLoadingStatus,
    SetOpenAttributeEditPanelActionInterface,
    SetCurrentPageActionInterface,
    SetTotalPagesActionInterface,
    IFetchDeleteSingleAttribute,
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
export const setOpenAttributeEditPanel = (
    payload: boolean
): SetOpenAttributeEditPanelActionInterface => ({
    type: AttributeActionType.SET_OPEN_ATTRIBUTE_EDIT_PANEL,
    payload,
});
