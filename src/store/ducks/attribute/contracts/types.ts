import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { Attribute, AttributeGroup } from './state';

export enum AttributeActionType {
    SET_ATTRIBUTE_LOADING_STATUS = 'attribute/SET_ATTRIBUTE_LOADING_STATUS',
    FETCH_ATTRIBUTE_GROUP_DATA = 'attribute/FETCH_ATTRIBUTE_GROUP_DATA',
    SET_ATTRIBUTE_GROUP_DATA = 'attribute/SET_ATTRIBUTE_GROUP_DATA',
    SET_OPEN_ATTRIBUTE_EDIT_PANEL = 'attribute/SET_OPEN_ATTRIBUTE_EDIT_PANEL',
    SET_CURRENT_PAGE = 'attribute/SET_CURRENT_PAGE',
    SET_TOTAL_PAGES = 'attribute/SET_TOTAL_PAGES',
}
export interface FetchAttributeGroupDataActionInterface
    extends Action<AttributeActionType> {
    type: AttributeActionType.FETCH_ATTRIBUTE_GROUP_DATA;
    str?: string;
    page?: number;
}
export interface SetAttributeGroupDataActionInterface
    extends Action<AttributeActionType> {
    type: AttributeActionType.SET_ATTRIBUTE_GROUP_DATA;
    payload: Array<AttributeGroup>;
}
export interface SetCurrentPageActionInterface extends Action<AttributeActionType> {
    type: AttributeActionType.SET_CURRENT_PAGE;
    payload: number;
}

export interface SetTotalPagesActionInterface extends Action<AttributeActionType> {
    type: AttributeActionType.SET_TOTAL_PAGES;
    payload: number;
}
export interface SetAttributeLoadingStatus extends Action<AttributeActionType> {
    type: AttributeActionType.SET_ATTRIBUTE_LOADING_STATUS;
    payload: LoadingStatus;
}
export interface SetOpenAttributeEditPanelActionInterface
    extends Action<AttributeActionType> {
    type: AttributeActionType.SET_OPEN_ATTRIBUTE_EDIT_PANEL;
    payload: boolean;
}
