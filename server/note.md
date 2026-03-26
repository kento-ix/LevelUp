Model query idea
prepare() -> prepare the query
execute() -> run it (results are ready on the DB side)
fetch() -> grab 1 row from those result
fetchAll() -> grab all rows at once

PDO::FETCH_ASSOOC tells fetch() what format to retunr the data in
With FETCH_ASSOC:
['UserID' => 1, Email => 'User1@gmail.com', 'Username' => 'User1']

Without it
[0 => 1, 'UserID' => 1, Email => 'User1@gmail.com', ...]

keep PDO:: FETCH_ASSOC on any SELECT query

hello