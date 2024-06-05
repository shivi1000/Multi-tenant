"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatypes1674199980999 = void 0;
class datatypes1674199980999 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE public.advertisement_type AS ENUM (
      'IMAGE',
      'VIDEO');`);
        await queryRunner.query(`CREATE TYPE public."friend_status" AS ENUM (
        'FRIEND',
        'BLOCKED');`);
        await queryRunner.query(`CREATE TYPE public."notification_status" AS ENUM (
          'PENDING',
          'SEND');`);
        await queryRunner.query(`CREATE TYPE public."notification_type" AS ENUM (
            'SYSTEM',
            'PROMOTIONAL');`);
        await queryRunner.query(`CREATE TYPE public."order_status" AS ENUM (
              'DELIVERED',
              'INROUTE',
              'CANCELLED',
              'PENDING');`);
        await queryRunner.query(`CREATE TYPE public."orders_type" AS ENUM (
              'PARCEL',
              'MAIL');`);
        await queryRunner.query(`CREATE TYPE public."partner_status" AS ENUM (
              'ACTIVE',
              'DEACTIVE');`);
        await queryRunner.query(`CREATE TYPE public."session_device_type" AS ENUM (
              'WEB',
              'ANDROID',
              'IOS');`);
        await queryRunner.query(`CREATE TYPE public."static_status" AS ENUM (
                'ACTIVE',
                'INACTIVE',
                'BLOCK',
                'DELETE');`);
        await queryRunner.query(`CREATE TYPE public."static_type" AS ENUM (
        'ABOUT_US',
        'TERMS_CONDITION',
        'SECURITY_PRIVACY',
        'FAQS',
        'CONTACT_US',
        'SUPPORT');`);
        await queryRunner.query(`CREATE TYPE public."status" AS ENUM (
        'ACTIVE',
        'DEACTIVE');`);
        await queryRunner.query(`CREATE TYPE public."support_status" AS ENUM (
        'PENDING',
        'RESOLVED');`);
        await queryRunner.query(`CREATE TYPE public."user_type" AS ENUM (
            'SELECTED',
            'SENDTOALL');`);
        await queryRunner.query(`CREATE TYPE public."users_signup_type" AS ENUM (
              'BASIC',
              'GOOGLE',
              'APPLE');`);
        await queryRunner.query(`CREATE TYPE public."users_status" AS ENUM (
      'ACTIVATED',
      'DEACTIVATED',
      'RESTRICTED',
      'DELETED',
      'PENDING');`);
        await queryRunner.query(`CREATE TYPE public."users_type" AS ENUM (
      'USER',
      'ADMIN');`);
    }
    async down(queryRunner) { }
}
exports.datatypes1674199980999 = datatypes1674199980999;
//# sourceMappingURL=1674199980999-datatypes.js.map