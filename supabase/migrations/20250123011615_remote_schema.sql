

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";






CREATE TYPE "public"."apartment_type" AS ENUM (
    'studio',
    'apartment',
    'house',
    'villa'
);


ALTER TYPE "public"."apartment_type" OWNER TO "postgres";


CREATE TYPE "public"."room_type" AS ENUM (
    'bedroom',
    'living_room',
    'kitchen',
    'bathroom'
);


ALTER TYPE "public"."room_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."apartment_feature_links" (
    "apartment_id" "uuid" NOT NULL,
    "feature_id" "uuid" NOT NULL
);


ALTER TABLE "public"."apartment_feature_links" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."apartment_features" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "category" "text" NOT NULL
);


ALTER TABLE "public"."apartment_features" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."apartment_rooms" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "apartment_id" "uuid",
    "room_type" "public"."room_type" NOT NULL,
    "area" numeric NOT NULL,
    "has_ac" boolean DEFAULT false,
    "has_heating" boolean DEFAULT false,
    "bed_count" integer,
    "bed_type" "text"
);


ALTER TABLE "public"."apartment_rooms" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."apartments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "apartment_type" "public"."apartment_type" NOT NULL,
    "total_area" numeric NOT NULL,
    "price_per_month" numeric NOT NULL,
    "bedroom_count" integer NOT NULL,
    "bathroom_count" integer NOT NULL,
    "max_occupancy" integer NOT NULL,
    "location_address" "text" NOT NULL,
    "location_city" "text" NOT NULL,
    "location_coordinates" "point" NOT NULL,
    "has_parking" boolean DEFAULT false,
    "has_yard" boolean DEFAULT false,
    "yard_area" numeric,
    "embedding" "extensions"."vector"(1024),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."apartments" OWNER TO "postgres";


ALTER TABLE ONLY "public"."apartment_feature_links"
    ADD CONSTRAINT "apartment_feature_links_pkey" PRIMARY KEY ("apartment_id", "feature_id");



ALTER TABLE ONLY "public"."apartment_features"
    ADD CONSTRAINT "apartment_features_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."apartment_features"
    ADD CONSTRAINT "apartment_features_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."apartment_rooms"
    ADD CONSTRAINT "apartment_rooms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."apartments"
    ADD CONSTRAINT "apartments_pkey" PRIMARY KEY ("id");



CREATE INDEX "apartments_bedroom_count_idx" ON "public"."apartments" USING "btree" ("bedroom_count");



CREATE INDEX "apartments_embedding_idx" ON "public"."apartments" USING "ivfflat" ("embedding" "extensions"."vector_cosine_ops");



CREATE INDEX "apartments_location_city_idx" ON "public"."apartments" USING "btree" ("location_city");



CREATE INDEX "apartments_price_per_month_idx" ON "public"."apartments" USING "btree" ("price_per_month");



CREATE OR REPLACE TRIGGER "update_apartments_updated_at" BEFORE UPDATE ON "public"."apartments" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."apartment_feature_links"
    ADD CONSTRAINT "apartment_feature_links_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."apartment_feature_links"
    ADD CONSTRAINT "apartment_feature_links_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "public"."apartment_features"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."apartment_rooms"
    ADD CONSTRAINT "apartment_rooms_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE CASCADE;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";










































































































































































































































































































































































































































































































































GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";






























GRANT ALL ON TABLE "public"."apartment_feature_links" TO "anon";
GRANT ALL ON TABLE "public"."apartment_feature_links" TO "authenticated";
GRANT ALL ON TABLE "public"."apartment_feature_links" TO "service_role";



GRANT ALL ON TABLE "public"."apartment_features" TO "anon";
GRANT ALL ON TABLE "public"."apartment_features" TO "authenticated";
GRANT ALL ON TABLE "public"."apartment_features" TO "service_role";



GRANT ALL ON TABLE "public"."apartment_rooms" TO "anon";
GRANT ALL ON TABLE "public"."apartment_rooms" TO "authenticated";
GRANT ALL ON TABLE "public"."apartment_rooms" TO "service_role";



GRANT ALL ON TABLE "public"."apartments" TO "anon";
GRANT ALL ON TABLE "public"."apartments" TO "authenticated";
GRANT ALL ON TABLE "public"."apartments" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
