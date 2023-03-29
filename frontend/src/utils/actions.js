import { createAction } from '@reduxjs/toolkit'

export const LOGIN = createAction('LOGIN')
export const LOGGED = createAction('LOGGED')
export const LOGOUT = createAction('LOGOUT')
export const USER_LOGIN=createAction('USER_LOGIN')

export const RESET_MSG = createAction('RESET_MSG');
export const REGISTER = createAction('REGISTER');

export const GET_USER_CONVS = createAction('GET_USER_CONVS');
export const GET_REQUESTS = createAction('GET_REQUESTS');
export const GET_USER_GROUPS = createAction('GET_USER_GROUPS');
export const GET_CONTACTS = createAction('GET_CONTACTS');


export const CREATE_CONVERSATION = createAction('CREATE_CONVERSATION');
export const CREATE_GROUP = createAction('CREATE_GROUP');
export const SEND_REQUEST = createAction('SEND_REQUEST');
export const RESPOND_REQUEST = createAction('RESPOND_REQUEST');

export const DELETE_CONV = createAction('DELETE_CONV');
export const DELETE_GROUP = createAction('DELETE_GROUP');
export const REMOVE_CONTACT = createAction('REMOVE_CONTACT');
export const UPDATE_GROUP = createAction('UPDATE_GROUP');
















