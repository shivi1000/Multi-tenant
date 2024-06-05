"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tables1674199982999 = void 0;
class tables1674199982999 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE public.users (
      "userId" text NOT NULL DEFAULT to_char(nextval('user_id_serial'::regclass), '"GF"0000000FM'::text),
      "fullName" varchar NULL DEFAULT ''::character varying,
      "password" varchar NULL DEFAULT ''::character varying,
      "profileImage" varchar NULL DEFAULT ''::character varying,
      "email" varchar NOT NULL,
      "mobileNumber" varchar NOT NULL,
      "countryCode" varchar NULL  DEFAULT ''::character varying,
      "country" varchar NULL DEFAULT ''::character varying,
      "latitude" float8 NULL DEFAULT 0.0,
      "longitude" float8 NULL DEFAULT 0.0,
      "signupType" public."users_signup_type" NULL DEFAULT 'BASIC'::users_signup_type,
      "googleId" varchar NULL DEFAULT ''::character varying,
      "appleId" varchar NULL DEFAULT ''::character varying,
      "status" public."users_status" NULL DEFAULT 'PENDING'::users_status,
      "isNotificationAllow" bool NULL DEFAULT true,
      "isNotificationMute" bool NULL DEFAULT false,
      "reffralCode" varchar NULL DEFAULT ''::character varying,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      "deletedAt" timestamp NULL,
      "emailVerified" bool NULL DEFAULT false,
      "phoneVerified" bool NULL DEFAULT false,
      "type" "public"."users_type" NULL DEFAULT 'USER'::users_type,
      "otpCounter" int4 NULL DEFAULT 0,
      "otpDateAt" timestamp NULL,
      "token" text NULL DEFAULT ''::character varying,
      "tcVerified" bool NOT NULL DEFAULT false,
      "address" text NULL DEFAULT ''::text,
      "sents" int8 NULL DEFAULT 0,
      "receiveds" int8 NULL DEFAULT 0,
      "delivereds" int8 NULL DEFAULT 0,
      CONSTRAINT users_pkey PRIMARY KEY ("userId")
    );`);
        await queryRunner.query(`CREATE TABLE public."paymentLogs" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "userId" text NOT NULL,
      "logs" varchar NOT NULL,
      "transactionId" varchar NOT NULL,
      "createdAt" timestamp NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      CONSTRAINT "paymentLogs_pkey" PRIMARY KEY ("id")
    );`);
        await queryRunner.query(`CREATE TABLE public."userOtp" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "userId" text NOT NULL,
      "otp" varchar NOT NULL,
      "mobileNumber" numeric NOT NULL,
      "countryCode" varchar NOT NULL,
      "createdAt" date NOT NULL DEFAULT now(),
      "otpTimeStamp" timestamp NOT NULL,
      CONSTRAINT "userOtp_pkey" PRIMARY KEY ("id")
    );`);
        await queryRunner.query(`CREATE TABLE public.transactions (
      "userId" text NOT NULL,
      "userName" varchar NOT NULL,
      "transactionId" varchar NOT NULL,
      "amount" float4 NOT NULL,
      "transactionDate" timestamp NOT NULL,
      "status" varchar NOT NULL,
      "transactionMode" varchar NULL DEFAULT '',
      "createdAt" timestamp NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      CONSTRAINT transactions_pkey PRIMARY KEY ("transactionId"),
      CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public.users("userId") ON DELETE CASCADE ON UPDATE CASCADE
    );`);
        await queryRunner.query(`CREATE TABLE public.partners (
      "partnerId" text NOT NULL DEFAULT to_char(nextval('partner_id_serial'::regclass), '"PR"0000000FM'::text),
      "partnerName" varchar NOT NULL,
      "description" varchar NOT NULL,
      "image" varchar NULL DEFAULT '',
      "status" public."partner_status" NULL DEFAULT 'ACTIVE'::partner_status,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now(),
      "deletedAt" timestamp NULL,
      CONSTRAINT partners_pkey PRIMARY KEY ("partnerId")
    );`);
        await queryRunner.query(`CREATE TABLE public.orders (
      "orderId" text NOT NULL DEFAULT to_char(nextval('order_id_serial'::regclass), '"OR"0000000FM'::text),
      "senderId" text NOT NULL,
      "senderPhoneNo" varchar NOT NULL,
      "recieverPhoneNo" varchar NOT NULL,
      "transactionId" varchar NOT NULL,
      "deliveryDate" timestamp NULL,
      "status" public."order_status" NOT NULL,
      "senderAddress" varchar NOT NULL,
      "recieverAddress" varchar NOT NULL,
      "type" public."orders_type" NOT NULL,
      "createdAt" timestamp NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      "track" bool NOT NULL DEFAULT false,
      "recieverAddressImage" varchar NOT NULL DEFAULT ''::character varying,
      "senderAddressImage" varchar NOT NULL DEFAULT ''::character varying,
      "verifyCount" int2 NULL DEFAULT 0,
      "recieverId" text NULL DEFAULT ''::text,
      "latitude" float8 NULL DEFAULT 0.0,
      "longitude" float8 NULL DEFAULT 0.0,
      CONSTRAINT orders_pkey PRIMARY KEY ("orderId"),
      CONSTRAINT fk_senderid FOREIGN KEY ("senderId") REFERENCES public.users("userId") ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_transactionid FOREIGN KEY ("transactionId") REFERENCES public.transactions("transactionId") ON DELETE CASCADE ON UPDATE CASCADE
    );`);
        await queryRunner.query(`CREATE TABLE public."orderSummary" (
      "orderSymmaryId" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "digitalCount" float8 NOT NULL,
      "discount" float8 NULL,
      "totalPrice" float8 NOT NULL,
      "transactionId" varchar NOT NULL,
      "createdAt" timestamp NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      CONSTRAINT "orderSummary_pkey" PRIMARY KEY ("orderSymmaryId"),
      CONSTRAINT fk_transaction FOREIGN KEY ("transactionId") REFERENCES public.transactions("transactionId") ON DELETE CASCADE ON UPDATE CASCADE
    );`);
        await queryRunner.query(`CREATE TABLE public.friends (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "senderId" text NOT NULL,
      "recieverId" text NOT NULL DEFAULT ''::text,
      "fullName" varchar NULL DEFAULT ''::character varying,
      "mobileNumber" varchar NULL DEFAULT ''::character varying,
      "status" public."friend_status" NULL,
      "profileImage" varchar NULL DEFAULT ''::character varying,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      CONSTRAINT friends_pkey PRIMARY KEY (id)
    );`);
        await queryRunner.query(`CREATE TABLE public.advertisement (
      "advertisementId" text NOT NULL DEFAULT to_char(nextval('advertisement_id_serial'::regclass), '"AD"0000000FM'::text),
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "partnerId" text NOT NULL,
      "partnerName" varchar NOT NULL,
      "url" varchar NOT NULL,
      "type" public."advertisement_type" NULL DEFAULT 'IMAGE'::advertisement_type,
      "mediaUrl" varchar NOT NULL,
      "status" public."status" NULL DEFAULT 'ACTIVE'::status,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now(),
      "deletedAt" timestamp NULL,
      "thumbnail" varchar DEFAULT ''::character varying,
      CONSTRAINT advertisement_pkey PRIMARY KEY ("advertisementId"),
      CONSTRAINT fk_partner FOREIGN KEY ("partnerId") REFERENCES public.partners("partnerId") ON DELETE CASCADE ON UPDATE CASCADE
    );`);
        await queryRunner.query(`CREATE TABLE public."support" (
      "id" text NOT NULL DEFAULT to_char(nextval('support_id_serial'::regclass), '"ST"0000000FM'::text),
      "userId" text NOT NULL,
      "email" varchar NULL DEFAULT '',
      "url" varchar NULL DEFAULT '',
      "message" varchar NULL DEFAULT '',
      "status" public."support_status" NULL,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      "fullName" varchar NULL DEFAULT '',
      CONSTRAINT "Support_pkey" PRIMARY KEY (id)
    );`);
        await queryRunner.query(`CREATE TABLE public."staticContent" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "description" varchar NULL DEFAULT ''::character varying,
      "status" public."static_status" NULL DEFAULT 'ACTIVE'::static_status,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      "type" public."static_type" NULL,
      "fullName" varchar NULL DEFAULT ''::character varying,
      "profileImage" varchar NULL DEFAULT ''::character varying,
      "email" _text NULL DEFAULT ARRAY[]::character varying[],
      "mobileNumber" _text NULL DEFAULT ARRAY[]::character varying[],
      "homeAddress" varchar NULL DEFAULT ''::character varying,
      "answer" varchar NULL DEFAULT ''::character varying,
      CONSTRAINT "Static-Content_pkey" PRIMARY KEY (id)
    );`);
        await queryRunner.query(`CREATE TABLE public."notification" (
      "id" text NOT NULL DEFAULT to_char(nextval('notification_id_serial'::regclass), '"NT"0000000FM'::text),
      "userType" public."user_type" NULL,
      "subject" varchar NULL DEFAULT '',
      "description" varchar NULL DEFAULT '',
      "notificationType" public."notification_type" NULL,
      "url" varchar NULL DEFAULT '',
      "status" public."notification_status" NULL DEFAULT 'PENDING'::notification_status,
      "userId" varchar NULL DEFAULT '',
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      CONSTRAINT "Notification_pkey" PRIMARY KEY (id)
    );`);
        await queryRunner.query(`CREATE TABLE public."appNotification" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "userId" varchar NULL DEFAULT '',
      "description" varchar NULL DEFAULT '',
      "read" bool NULL DEFAULT false,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      "url" varchar NULL DEFAULT '',
      "title" varchar NULL DEFAULT '',
      "type" varchar NULL DEFAULT '',
      CONSTRAINT "AppNotification_pkey" PRIMARY KEY (id)
    );`);
        await queryRunner.query(`CREATE TABLE public."userSessions" (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      "userId" text NOT NULL,
      ip text NULL,
      "isActive" bool NOT NULL DEFAULT true,
      "deviceType" public."session_device_type" NULL DEFAULT 'ANDROID'::session_device_type,
      "deviceToken" text NULL,
      "deviceId" text NULL,
      "lastLogin" timestamp NOT NULL DEFAULT now(),
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NULL,
      CONSTRAINT "userSessions_pkey" PRIMARY KEY (id),
      CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public.users("userId") ON DELETE CASCADE ON UPDATE CASCADE
    );`);
    }
    async down(queryRunner) { }
}
exports.tables1674199982999 = tables1674199982999;
//# sourceMappingURL=1674199982999-tables.js.map