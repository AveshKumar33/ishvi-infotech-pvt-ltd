// import { CanActivate, ExecutionContext, forwardRef, Inject, mixin, Type } from "@nestjs/common"

// export const PermissionGuard = (permission: string): Type<CanActivate> => {
//     class PermissionGuardMixin implements CanActivate {
//         constructor(
//             @Inject(forwardRef(() => RolePermissionsService))
//             private rolePermissionsServices: RolePermissionsService
//         ) { }

//         async canActivate(context: ExecutionContext) {
//             // do something with context and role
//             const request = context.switchToHttp().getRequest()
//             const user = request.user.authuser
//             if (!!request.user.authuser.default) return true
//             let resultStatus = false
//             for await (const role of user.role_list) {
//                 let result = await this.rolePermissionsServices.getPermission(role, permission)
//                 if (result) {
//                     resultStatus = true
//                     break
//                 }
//             }
//             if (resultStatus) {
//                 return true
//             } else {
//                 return false
//             }
//         }
//     }

//     const guard = mixin(PermissionGuardMixin)
//     return guard
// }

// export const PermissionsGuard = (permissions: string[]): Type<CanActivate> => {
//     class PermissionGuardMixin implements CanActivate {
//         constructor(
//             @Inject(forwardRef(() => RolePermissionsService))
//             private rolePermissionsServices: RolePermissionsService
//         ) { }

//         async canActivate(context: ExecutionContext) {
//             // do something with context and role
//             const request = context.switchToHttp().getRequest()
//             const user = request.user.authuser
//             if (!!request.user.authuser.default) return true
//             let resultStatus = false
//             for await (const role of user.role_list) {
//                 let result = await this.rolePermissionsServices.getPermissions(role, permissions)
//                 if (result.length > 0) {
//                     resultStatus = true
//                     break
//                 }
//             }
//             if (resultStatus) {
//                 return true
//             } else {
//                 return false
//             }
//         }
//     }

//     const guard = mixin(PermissionGuardMixin)
//     return guard
// }
