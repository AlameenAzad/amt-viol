<?php
    /**
     * GIT DEPLOYMENT SCRIPT
     *
     * Used for automatically deploying websites via GitHub
     *
     */

    // array of commands
    $commands = array(
        'cd /var/www/amt-clone/amt-viol/ && echo $PWD',
        'cd /var/www/amt-clone/amt-viol/ && whoami',
        'cd /var/www/amt-clone/amt-viol/ && git pull',
        'cd /var/www/amt-clone/amt-viol/ && git status',
        'cd /var/www/amt-clone/amt-viol/ && git submodule sync',
        'cd /var/www/amt-clone/amt-viol/ && git submodule update',
        'cd /var/www/amt-clone/amt-viol/ && git submodule status',
        'cd /var/www/amt-clone/amt-viol/ && yarn',
        'cd /var/www/amt-clone/amt-viol/ && quasar build'
    );

    // exec commands
    $output = '';
    foreach($commands AS $command){
        $tmp = shell_exec($command);
        
        $output .= "{$command}\n";
        $output .= htmlentities(trim($tmp)) . "\n";
    }
?>

<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>GIT DEPLOYMENT SCRIPT</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<div style="width:700px">
    <div style="float:left;width:350px;">
    <p style="color:white;">Git Deployment Script</p>
    <?php echo $output; ?>
    </div>
</div>
</body>
</html>