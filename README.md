# sveltekit-supabase-starter

Highly inspired and based on [sveltekit-supabase-demo](https://github.com/ashleyconnor/sveltekit-supabase-demo) and [svelte-starter-kit](https://github.com/one-aalam/svelte-starter-kit), but with some changes to fit my needs/preferences:

1. Fixed issues with SSR Auth and last SvelteKit breaking updates
2. No Typescript
3. No Tailwind
4. And other changes here and there...


----


## Getting started

### Create a .env file

This project requires your Supbase URL and public token

```
VITE_SUPABASE_URL=https://xxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=<jwt_token>
```

### Create tables

To get started create a Supabase account and run the following script in the SQL tab of a new project:

```sql
create table todos (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  task text check (char_length(task) > 3),
  is_complete boolean default false,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table todos enable row level security;

create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = user_id);

create policy "Individuals can view their own todos. " on todos for
    select using (auth.uid() = user_id);

create policy "Individuals can update their own todos." on todos for
    update using (auth.uid() = user_id);

create policy "Individuals can delete their own todos." on todos for
    delete using (auth.uid() = user_id);
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
