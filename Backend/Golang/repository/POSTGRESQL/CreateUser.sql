INSERT INTO users.user (login, password, email, fullname, institution, website, bio )
		VALUES(
            $1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7
            )
