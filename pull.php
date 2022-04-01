<?php
    /**
     * GIT DEPLOYMENT SCRIPT
     *
     * Used for automatically deploying websites via GitHub
     *
     */

    // array of commands
    $commands = array(
        'cd /var/www/amt-viol/ && echo $PWD',
        'cd /var/www/amt-viol/ && whoami',
        'cd /var/www/amt-viol/ && git pull',
        'cd /var/www/amt-viol/ && git status',
        'cd /var/www/amt-viol/ && git submodule sync',
        'cd /var/www/amt-viol/ && git submodule update',
        'cd /var/www/amt-viol/ && git submodule status',
	    'cd /var/www/amt-viol/ && yarn',
	    'cd /var/www/amt-viol/ && quasar build'
    );

    // exec commands
    $output = '';
    foreach($commands AS $command){
        $tmp = shell_exec($command);
        
        $output .= "{$command}\n";
        $output .= htmlentities(trim($tmp)) . "\n";
    }
?>