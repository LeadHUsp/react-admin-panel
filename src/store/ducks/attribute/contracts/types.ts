import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { AttributeGroup } from './state';

export enum AttributeActionType {
    SET_ATTRIBUTE_LOADING_STATUS = 'attribute/SET_ATTRIBUTE_LOADING_STATUS',
    FETCH_ATTRIBUTE_GROUP_DATA = 'attribute/FETCH_ATTRIBUTE_GROUP_DATA',
    FETCH_DELETE_ATTRIBUTE_GROUP_SINGLE = 'attribute/FETCH_DELETE_ATTRIBUTE_GROUP_SINGLE',
    SET_ATTRIBUTE_GROUP_DATA = 'attribute/SET_ATTRIBUTE_GROUP_DATA',
    SET_ATTRIBUTE_GROUP_IDS = 'attribute/SET_ATTRIBUTE_GROUP_IDS',
    SET_CHOOSED_ITEMS = 'attribute/SET_CHOOSED_ITEMS',
    SET_CURRENT_PAGE = 'attribute/SET_CURRENT_PAGE',
    SET_TOTAL_PAGES = 'attribute/SET_TOTAL_PAGES',
    CONFIRM_DELETE_SINGLE = 'attribute/CONFIRM_DELETE_SINGLE',
    CLOSE_CONFIRM_DIALOG = 'attribute/CLOSE_CONFIRM_DIALOG',
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
export interface ISetAttributeGroupIds extends Action<AttributeActionType> {
    type: AttributeActionType.SET_ATTRIBUTE_GROUP_IDS;
    payload: string[];
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

export interface IFetchDeleteSingleAttribute extends Action<AttributeActionType> {
    type: AttributeActionType.FETCH_DELETE_ATTRIBUTE_GROUP_SINGLE;
    payload: string;
    str?: string;
    page?: number;
}
export interface ISetChoosedItems extends Action<AttributeActionType> {
    type: AttributeActionType.SET_CHOOSED_ITEMS;
    payload: string[];
}
export interface IConfirmDeleteSingleItem extends Action<AttributeActionType> {
    type: AttributeActionType.CONFIRM_DELETE_SINGLE;
    payload: string;
}
export interface ICloseConfirmDialog extends Action<AttributeActionType> {
    type: AttributeActionType.CLOSE_CONFIRM_DIALOG;
}
