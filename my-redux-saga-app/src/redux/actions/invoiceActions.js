import { CREATE_INVOICE,DELETE_INVOICE,FETCH_INVOICES ,UPDATE_INVOICE} from "../constants/invoiceConstants";

export const fetchInvoice = () => ({ type: FETCH_INVOICES });
export const createInvoice = (account) => ({ type: CREATE_INVOICE, payload: account });
export const updateInvoice = (account) => ({ type: UPDATE_INVOICE, payload: account });
export const deleteInvoice = (id) => ({ type: DELETE_INVOICE, payload: id });
