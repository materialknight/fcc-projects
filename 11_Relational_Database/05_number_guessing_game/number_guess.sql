--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)

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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: players_data; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.players_data (
    player character varying(22) NOT NULL,
    games_played integer,
    best_game integer
);


ALTER TABLE public.players_data OWNER TO freecodecamp;

--
-- Data for Name: players_data; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.players_data VALUES ('user_1712548211573', 2, 68);
INSERT INTO public.players_data VALUES ('user_1712548211574', 5, 222);
INSERT INTO public.players_data VALUES ('user_1712549084740', 2, 75);
INSERT INTO public.players_data VALUES ('user_1712549084741', 5, 44);


--
-- Name: players_data best_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.players_data
    ADD CONSTRAINT best_scores_pkey PRIMARY KEY (player);


--
-- PostgreSQL database dump complete
--

