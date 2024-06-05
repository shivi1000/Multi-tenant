"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequences1574199981999 = void 0;
class sequences1574199981999 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE SEQUENCE public.advertisement_id_serial
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;`);
        await queryRunner.query(`CREATE SEQUENCE public.notification_id_serial
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;`);
        await queryRunner.query(`CREATE SEQUENCE public.order_id_serial
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;`);
        await queryRunner.query(`CREATE SEQUENCE public.partner_id_serial
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;`);
        await queryRunner.query(`CREATE SEQUENCE public.user_id_serial
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;`);
        await queryRunner.query(`CREATE SEQUENCE public.support_id_serial
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;`);
    }
    async down(queryRunner) { }
}
exports.sequences1574199981999 = sequences1574199981999;
//# sourceMappingURL=1574199981999-sequences.js.map