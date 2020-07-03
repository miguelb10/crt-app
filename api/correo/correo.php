<?php
error_reporting(0);
if(isset($_POST['nombre']) && $_POST['nombre'] && 
isset($_POST['asunto']) && $_POST['asunto'] &&
isset($_POST['correo']) && $_POST['correo'] &&
isset($_POST['celular']) && $_POST['celular'] &&
isset($_POST['empresa']) && $_POST['empresa'] &&
isset($_POST['mensaje']) && $_POST['mensaje'] ){
    $destino = "info@crt.com.pe";
    $cabeceras = 'MIME-Version: 1.0' . "\r\n";
    $cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $cabeceras .= 'From: info@crt.com.pe'."\r\n";
    
    $nombre = $_POST['nombre'];
    $asunto = $_POST['asunto'];
    $correoCliente = $_POST['correo'];
    $celular = $_POST['celular'];
    $empresa = $_POST['empresa'];
    $mensaje = $_POST['mensaje'];
    $mensajehtml = "
    <html>
    <head>
    <title>Correo Web</title>
    </head>
    <body>
    <h4>Nombre:</h4>
    <p>$nombre</p>    
    <h4>Correo:</h4>
    <p>$correoCliente</p>
    <h4>Celular:</h4>
    <p>$celular</p>
    <h4>Empresa:</h4>
    <p>$empresa</p>
    <h4>Mensaje:</h4>
    <p>$mensaje</p>
    </body>
    </html>";

    $asuntoCliente = "Confirmación automatica";
    $mensajeCliente = "
    <html>
    <head>
    <title>Correo Web</title>
    </head>
    <body>
    <p>Gracias por comunicarse con Commit & Rollback Technology S.A.C.,</p>
	  <p>en breve uno de nuestros asesores se comunicará con Ud.
    </p>
    <a href='http://www.crt.com.pe/'><img src='http://www.crt.com.pe/img/Firma.png' /></a>
    </body>
    </html>";

    $successAdm =  mail($destino, $asunto, $mensajehtml, $cabeceras);
    $successCli =  mail($correoCliente, $asuntoCliente, $mensajeCliente, $cabeceras);
    if($successAdm && $successCli){
      echo json_encode(array('success' => 1));
    }
    else{
      echo json_encode(array('success' => 0));
    }
}else{
  header("Location: /");
}
?>