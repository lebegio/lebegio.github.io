CREATE TABLE poll (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing ID column
    name VARCHAR(255) NOT NULL,  -- String column for name (max length: 255)
    is_active BOOLEAN DEFAULT FALSE -- Boolean column with a default value of TRUE
);

CREATE TABLE poll_option (
    id SERIAL PRIMARY KEY,        -- Auto-incrementing ID column
    poll_id INTEGER NOT NULL, -- Foreign key to my_table
    name VARCHAR(255) NOT NULL,   -- String column for name
    win BOOLEAN DEFAULT FALSE,    -- Boolean column indicating win status, default is FALSE
    CONSTRAINT fk_polls FOREIGN KEY (poll_id) REFERENCES poll (id) ON DELETE CASCADE
);

CREATE TABLE user_choice (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing ID column
    poll_option_id INTEGER NOT NULL,   -- Foreign key to poll_option
    amount FLOAT NOT NULL,             -- Float column for amount
    user_id BIGINT NOT NULL,           -- Int64 (BIGINT) column for user ID
    wallet_address VARCHAR(255),       -- String column for wallet address
    CONSTRAINT fk_poll_option FOREIGN KEY (poll_option_id) REFERENCES poll_option (id) ON DELETE CASCADE
);
