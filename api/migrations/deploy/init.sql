

BEGIN;

CREATE TABLE "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "nickname" TEXT NOT NULL,
  "firstname" TEXT,
  "lastname" TEXT,
  "description" TEXT,
  "address" TEXT,
  "city" TEXT,
  "phone" TEXT,
  "avatar" TEXT,
  "is_admin" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "lat" TEXT NOT NULL,
  "long" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "user_id" int NOT NULL REFERENCES "user"("id")
);

CREATE TABLE "message" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "message" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "exp_user_id" int NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "dest_user_id" int NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE "comment" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "text" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  "user_id" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "activity_id" int NOT NULL REFERENCES activity(id) ON DELETE CASCADE
);


CREATE TABLE "type" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_activity" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES "user"(id),
    "activity_id" int NOT NULL REFERENCES activity(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_to_activity" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES "user"(id),
    "activity_id" int NOT NULL REFERENCES activity(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "activity_has_type" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type_id" int NOT NULL REFERENCES type(id),
    "activity_id" int NOT NULL REFERENCES activity(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



COMMIT;


