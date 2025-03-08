--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "wild-transfer";




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:+gI43ZmlkH3YrEzEbZeuRQ==$XaSirGcksbZYVHce6tUEYp2oDUdiR15qRfmf3Vs4Obo=:Rl+OQV6FTwlPf7eCAwEUoxaIg4vPetoWK9IAJ8bdEok=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 16.6 (Debian 16.6-1.pgdg120+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 16.6 (Debian 16.6-1.pgdg120+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "wild-transfer" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Debian 16.6-1.pgdg120+1)
-- Dumped by pg_dump version 16.6 (Debian 16.6-1.pgdg120+1)

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

--
-- Name: wild-transfer; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "wild-transfer" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "wild-transfer" OWNER TO postgres;

\connect -reuse-previous=on "dbname='wild-transfer'"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: billing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.billing (
                                id integer NOT NULL,
                                subscription_date timestamp without time zone DEFAULT now() NOT NULL,
                                end_subscription_date timestamp without time zone,
                                next_payment_date timestamp without time zone NOT NULL,
                                last_payment_date timestamp without time zone NOT NULL,
                                created_at timestamp without time zone DEFAULT now() NOT NULL,
                                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                                plan_id integer,
                                user_id integer
);


ALTER TABLE public.billing OWNER TO postgres;

--
-- Name: billing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.billing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.billing_id_seq OWNER TO postgres;

--
-- Name: billing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.billing_id_seq OWNED BY public.billing.id;


--
-- Name: file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.file (
                             id integer NOT NULL,
                             file_uid character varying,
                             name character varying,
                             default_name character varying,
                             path character varying,
                             size integer,
                             privacy_status character varying DEFAULT 'public'::character varying,
                             type character varying,
                             created_at timestamp without time zone DEFAULT now() NOT NULL,
                             updated_at timestamp without time zone DEFAULT now() NOT NULL,
                             "uploadId" integer
);


ALTER TABLE public.file OWNER TO postgres;

--
-- Name: file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.file_id_seq OWNER TO postgres;

--
-- Name: file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.file_id_seq OWNED BY public.file.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
                                   id integer NOT NULL,
                                   "timestamp" bigint NOT NULL,
                                   name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan (
                             id integer NOT NULL,
                             name character varying NOT NULL,
                             price integer NOT NULL,
                             billing character varying NOT NULL,
                             description character varying NOT NULL,
                             created_at timestamp without time zone DEFAULT now() NOT NULL,
                             updated_at timestamp without time zone DEFAULT now() NOT NULL,
                             is_suggested boolean DEFAULT false
);


ALTER TABLE public.plan OWNER TO postgres;

--
-- Name: plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plan_id_seq OWNER TO postgres;

--
-- Name: plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plan_id_seq OWNED BY public.plan.id;


--
-- Name: report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report (
                               id integer NOT NULL,
                               comment character varying NOT NULL,
                               status character varying NOT NULL,
                               created_at timestamp without time zone DEFAULT now() NOT NULL,
                               updated_at timestamp without time zone DEFAULT now() NOT NULL,
                               "fileId" integer
);


ALTER TABLE public.report OWNER TO postgres;

--
-- Name: report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.report_id_seq OWNER TO postgres;

--
-- Name: report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_id_seq OWNED BY public.report.id;


--
-- Name: upload; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.upload (
                               id integer NOT NULL,
                               title character varying NOT NULL,
                               message text,
                               is_activated boolean DEFAULT true NOT NULL,
                               receivers text[] NOT NULL,
                               created_at timestamp without time zone DEFAULT now() NOT NULL,
                               updated_at timestamp without time zone DEFAULT now() NOT NULL,
                               "visitorId" integer,
                               "userId" integer
);


ALTER TABLE public.upload OWNER TO postgres;

--
-- Name: upload_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.upload_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.upload_id_seq OWNER TO postgres;

--
-- Name: upload_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.upload_id_seq OWNED BY public.upload.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
                               id integer NOT NULL,
                               firstname character varying NOT NULL,
                               lastname character varying NOT NULL,
                               email character varying NOT NULL,
                               password character varying NOT NULL,
                               profile_picture_name character varying,
                               role character varying DEFAULT 'user'::character varying NOT NULL,
                               created_at timestamp without time zone DEFAULT now() NOT NULL,
                               updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_access_file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_access_file (
                                         file_id integer NOT NULL,
                                         user_id integer NOT NULL
);


ALTER TABLE public.user_access_file OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: visitor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visitor (
                                id integer NOT NULL,
                                email character varying NOT NULL,
                                email_is_verified boolean DEFAULT false NOT NULL,
                                code integer DEFAULT 123456 NOT NULL,
                                created_at timestamp without time zone DEFAULT now() NOT NULL,
                                updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.visitor OWNER TO postgres;

--
-- Name: visitor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.visitor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.visitor_id_seq OWNER TO postgres;

--
-- Name: visitor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.visitor_id_seq OWNED BY public.visitor.id;


--
-- Name: billing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing ALTER COLUMN id SET DEFAULT nextval('public.billing_id_seq'::regclass);


--
-- Name: file id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file ALTER COLUMN id SET DEFAULT nextval('public.file_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan ALTER COLUMN id SET DEFAULT nextval('public.plan_id_seq'::regclass);


--
-- Name: report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report ALTER COLUMN id SET DEFAULT nextval('public.report_id_seq'::regclass);


--
-- Name: upload id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload ALTER COLUMN id SET DEFAULT nextval('public.upload_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: visitor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitor ALTER COLUMN id SET DEFAULT nextval('public.visitor_id_seq'::regclass);


--
-- Data for Name: billing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.billing (id, subscription_date, end_subscription_date, next_payment_date, last_payment_date, created_at, updated_at, plan_id, user_id) FROM stdin;
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.file (id, file_uid, name, default_name, path, size, privacy_status, type, created_at, updated_at, "uploadId") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan (id, name, price, billing, description, created_at, updated_at, is_suggested) FROM stdin;
3	VIP	50		Description :)	2025-01-06 13:40:20.666859	2025-01-06 13:40:20.666859	f
2	PREMIUM	25		Description :)	2025-01-06 13:40:03.78765	2025-01-06 13:40:03.78765	t
1	CLASSIC	0		Description :)	2025-01-06 13:39:13.411215	2025-01-06 13:39:13.411215	f
\.


--
-- Data for Name: report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report (id, comment, status, created_at, updated_at, "fileId") FROM stdin;
\.


--
-- Data for Name: upload; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.upload (id, title, message, is_activated, receivers, created_at, updated_at, "visitorId", "userId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, firstname, lastname, email, password, profile_picture_name, role, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_access_file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_access_file (file_id, user_id) FROM stdin;
\.


--
-- Data for Name: visitor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visitor (id, email, email_is_verified, code, created_at, updated_at) FROM stdin;
\.


--
-- Name: billing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.billing_id_seq', 87, true);


--
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.file_id_seq', 13, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plan_id_seq', 3, true);


--
-- Name: report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_id_seq', 1, false);


--
-- Name: upload_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.upload_id_seq', 7, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 159, true);


--
-- Name: visitor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visitor_id_seq', 1, false);


--
-- Name: upload PK_1fe8db121b3de4ddfa677fc51f3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload
    ADD CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY (id);


--
-- Name: user_access_file PK_316aec9a0fa9a8f556a4cde7cba; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_access_file
    ADD CONSTRAINT "PK_316aec9a0fa9a8f556a4cde7cba" PRIMARY KEY (file_id, user_id);


--
-- Name: file PK_36b46d232307066b3a2c9ea3a1d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY (id);


--
-- Name: plan PK_54a2b686aed3b637654bf7ddbb3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: report PK_99e4d0bea58cba73c57f935a546; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY (id);


--
-- Name: visitor PK_ba6ae421d03de90a99ed838741d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitor
    ADD CONSTRAINT "PK_ba6ae421d03de90a99ed838741d" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: billing PK_d9043caf3033c11ed3d1b29f73c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing
    ADD CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY (id);


--
-- Name: billing REL_9ca061d016ac9dd27dd85dd842; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing
    ADD CONSTRAINT "REL_9ca061d016ac9dd27dd85dd842" UNIQUE (user_id);


--
-- Name: IDX_12d4f940ca53050751b11229a5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_12d4f940ca53050751b11229a5" ON public.user_access_file USING btree (file_id);


--
-- Name: IDX_e765bdc2b73b32ff3aa0335518; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e765bdc2b73b32ff3aa0335518" ON public.user_access_file USING btree (user_id);


--
-- Name: file FK_0583ebc4d98a0010a9475fb7ee0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT "FK_0583ebc4d98a0010a9475fb7ee0" FOREIGN KEY ("uploadId") REFERENCES public.upload(id);


--
-- Name: upload FK_0acad24db01762fb1d5b51a70cd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload
    ADD CONSTRAINT "FK_0acad24db01762fb1d5b51a70cd" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user_access_file FK_12d4f940ca53050751b11229a5c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_access_file
    ADD CONSTRAINT "FK_12d4f940ca53050751b11229a5c" FOREIGN KEY (file_id) REFERENCES public.file(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: billing FK_63f4db8ca9063690ab4dfc3b3da; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing
    ADD CONSTRAINT "FK_63f4db8ca9063690ab4dfc3b3da" FOREIGN KEY (plan_id) REFERENCES public.plan(id);


--
-- Name: billing FK_6ec7451dce8b34da53e553f81dc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billing
    ADD CONSTRAINT "FK_6ec7451dce8b34da53e553f81dc" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: report FK_745a0f7c76266d259bcc4ec74e3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT "FK_745a0f7c76266d259bcc4ec74e3" FOREIGN KEY ("fileId") REFERENCES public.file(id);


--
-- Name: upload FK_8152634c574ca03d2490c87013e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload
    ADD CONSTRAINT "FK_8152634c574ca03d2490c87013e" FOREIGN KEY ("visitorId") REFERENCES public.visitor(id);


--
-- Name: user_access_file FK_e765bdc2b73b32ff3aa03355187; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_access_file
    ADD CONSTRAINT "FK_e765bdc2b73b32ff3aa03355187" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--
