<?php
?>

<div class="form-container">
	<form action="#" method="post">

		<?php
		foreach ($types as $index => $type) {
			echo '<span class="input-field">';
			echo '<input type= "' . $type . '" name="' . $names[$index] . '" id="' . $names[$index] .
				'" placeholder="' . $placeholders[$index] . '" pattern="' . $patterns[$index] . '" required'. 
        ' value="' . $values[$index] . '">';
			echo '</span>';
		}

		?>

		<input type="submit" name="submit" value="Submit">

	</form>
</div>