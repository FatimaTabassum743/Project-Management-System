import { configureStore } from "@reduxjs/toolkit";
// import QuotationsReducer from "Redux-Store/Stores/QuotationsSlice";
import AddProjectSlice from "./AddProjects/AddProject";
import FinishProductSpecificationSlice from "./FinishProductSpecification/FinishProductSpecificationSlice";

import CustomersReducer from "Redux-Store/Customers/CustomersSlice";

import OrdersSlice from "Redux-Store/Orders/OrdersSlice";
import BatchSheet from "Redux-Store/BatchSheet/BatchSheetSlice";
import ProductsSlice from "./Products/ProductsSlice";
import RawMaterialsSlice from "./Inventory/RawMaterials/RawMaterialsSlice";
import PurchaseOrderSlice from "./Inventory/PurchaseOrders/PurchaseOrderSlice";
import VendorProfilesSlice from "Redux-Store/Inventory/VendorProfile/VendorProfileSlice";
import AddProject from "Views/Postlogin/Projects/Addproject";
const store = configureStore({
  reducer: {
    // savedQuotations: QuotationsReducer,
    AddProject: AddProjectSlice,
    finishProductSpecifications: FinishProductSpecificationSlice,
    orders: OrdersSlice,
    customers: CustomersReducer,
    batchsheet: BatchSheet,
    products: ProductsSlice,
    rawmaterials: RawMaterialsSlice,
    purchaseorders: PurchaseOrderSlice,
    vendorprofile: VendorProfilesSlice,
  },
});

export default store;