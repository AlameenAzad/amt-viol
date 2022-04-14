<?php
    /**
     * GIT DEPLOYMENT SCRIPT
     *
     * Used for automatically deploying websites via GitHub
     *
     */

    // array of commands
    $commands = array(
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && echo $PWD',
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && whoami',
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && git reset --hard',
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && git pull',
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && git status',
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && git submodule sync',
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && git submodule update',
        'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && git submodule status',
	    'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && yarn',
	    'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && NODE_ENV=production yarn build',
	    'cd /mnt/HC_Volume_18048612/api-clone/amtviold-api && pm2 restart server',
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