/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./types/auth.dto"), { "RegisterReq": { email: { required: true, type: () => String }, password: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String } }, "LoginReq": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./types/disk-images.dto"), { "DiskImagesQuery": { tags: { required: true, type: () => [String] }, excludeTags: { required: true, type: () => [String] }, page: { required: true, type: () => Number }, pageSize: { required: true, type: () => Number }, q: { required: true, type: () => String } }, "DiskImagesFindManyQuery": { skip: { required: false, type: () => Number }, take: { required: false, type: () => Number }, cursor: { required: false, type: () => Object }, where: { required: false, type: () => Object }, orderBy: { required: false, type: () => Object } } }], [import("./types/instances.dto"), { "InstancesQuery": { sortBy: { required: true, type: () => String }, page: { required: true, type: () => Number }, pageSize: { required: true, type: () => Number }, q: { required: true, type: () => String } }, "InstancesFindManyQuery": { skip: { required: false, type: () => Number }, take: { required: false, type: () => Number }, cursor: { required: false, type: () => Object }, where: { required: false, type: () => Object }, orderBy: { required: false, type: () => Object } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { description: "Hello world route for testing purposes.", type: String }, "countriesList": {}, "statesList": { type: Object }, "testMail": { type: Object } } }], [import("./controllers/auth.controller"), { "AuthController": { "login": {}, "register": {}, "me": {}, "requestConfirmationEmail": { type: Boolean }, "confirmEmail": { type: Boolean }, "requestPasswordReset": { type: Boolean }, "resetPassword": {} } }], [import("./controllers/users.controller"), { "UsersController": { "users": {}, "user": {}, "createUser": {}, "deleteUser": {} } }], [import("./controllers/products.controller"), { "ProductsController": { "products": {}, "product": {}, "createProduct": {}, "updateProduct": {}, "deleteProduct": {} } }], [import("./controllers/orders.controller"), { "OrdersController": { "orders": {}, "order": {}, "createOrder": { type: Object }, "updateOrder": {}, "estimateTaxes": {}, "availableShippingMethods": {}, "availableCoupons": { type: [Object] }, "updateOrderStatus": {} } }], [import("./controllers/coupons.controller"), { "CouponsController": { "coupons": { type: [Object] }, "coupon": {}, "createCoupon": {}, "validate": { type: Object }, "updateCoupon": {} } }], [import("./controllers/payments.controller"), { "PaymentsController": { "payments": { type: [Object] }, "createSubscription": {}, "createPaymentIntent": {}, "webhooks": { type: Boolean } } }], [import("./controllers/disk-images.controller"), { "DiskImagesController": { "diskImages": { type: Object }, "diskImage": {}, "createDiskImage": {} } }], [import("./controllers/notifications.controller"), { "NotificationsController": { "orders": {}, "order": {}, "createNotification": {}, "updateNotification": {} } }], [import("./controllers/categories.controller"), { "CategoriesController": { "categories": {}, "category": {}, "createCategory": {}, "updateCategory": {}, "deleteCategory": {} } }], [import("./controllers/options.controller"), { "OptionsController": { "options": {}, "option": { type: Object }, "createOption": {}, "updateOption": {}, "deleteOption": {} } }], [import("./controllers/stats.controller"), { "StatsController": { "dashboard": {}, "category": {} } }], [import("./controllers/instances.controller"), { "InstancesController": { "proxy": {}, "myInstances": { type: [Object] }, "createInstances": {}, "myInstance": { type: Object }, "updateInstance": { type: Object }, "deleteInstance": {}, "setupVNCTunnel": { type: Boolean }, "action": {}, "callback": { type: Object } } }], [import("./controllers/public.controller"), { "PublicController": { "dashboard": {} } }], [import("./controllers/subscriptions.controller"), { "SubscriptionsController": { "subscriptions": {}, "subscription": {}, "createSubscription": {}, "updateSubscription": {}, "updateSubscriptionStatus": {} } }], [import("./controllers/configs.controller"), { "ConfigsController": { "configs": { type: Object }, "config": {}, "createCategory": {}, "updateCategory": {}, "deleteCategory": {} } }]] } };
};