-- AlterTable
CREATE SEQUENCE address_id_seq;
ALTER TABLE "Address" ALTER COLUMN "id" SET DEFAULT nextval('address_id_seq');
ALTER SEQUENCE address_id_seq OWNED BY "Address"."id";
