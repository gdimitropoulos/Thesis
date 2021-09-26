

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;



CREATE TABLE public.users (
                              user_id bigint NOT NULL,
                              first_name text NOT NULL,
                              last_name text NOT NULL,
                              email text NOT NULL,
                              pwd text NOT NULL
);


ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          MAXVALUE 2147483647
          CACHE 1
          );


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- Name: users users_un_email; Type: CONSTRAINT; Schema: public; Owner: rsvp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_un_email UNIQUE (email);


--