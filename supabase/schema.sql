-- Run this once in Supabase > SQL Editor
create extension if not exists pgcrypto;

create table if not exists employer_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'New',
  company_name text not null, contact_person text not null,
  email text not null, phone text not null,
  job_role text not null, openings int not null, location text not null,
  description text, file_path text, file_name text
);
create table if not exists candidates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'New',
  full_name text not null, email text not null, phone text not null,
  location text not null, experience text not null, skills text not null,
  preferred_role text not null, consent boolean not null default false,
  file_path text, file_name text
);
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'New',
  name text not null, email text not null, phone text, message text not null
);
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null, location text not null, job_type text not null default 'Full-time',
  experience text, description text, active boolean not null default true
);

-- Lock tables: only the server (service role key) can read/write
alter table employer_enquiries enable row level security;
alter table candidates enable row level security;
alter table contact_messages enable row level security;
alter table jobs enable row level security;

-- Private bucket for resumes and JDs
insert into storage.buckets (id, name, public) values ('uploads', 'uploads', false)
on conflict (id) do nothing;
