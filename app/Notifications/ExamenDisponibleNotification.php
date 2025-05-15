<?php

namespace App\Notifications;

use App\Models\Examen; 
use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User; 

class ExamenDisponibleNotification extends Notification // implements ShouldQueue // Opcional: para enviar correos en cola
{
    use Queueable;

    public $examen;
    public $alumno;

    /**
     * Create a new notification instance.
     *
     * @param Examen $examen El examen que está disponible
     * @param User $alumno El alumno que recibirá la notificación
     * @return void
     */
    public function __construct(Examen $examen, User $alumno)
    {
        $this->examen = $examen;
        $this->alumno = $alumno;
    }

    
    public function via($notifiable)
    {
        return ['mail']; // Especificamos que esta notificación se enviará por correo
    }

   
    public function toMail(object $notifiable): MailMessage
    {
        
        $url = route('examenesAlumno', $this->examen->id);

        return (new MailMessage)
                    ->subject('Nuevo Examen Disponible: ' . $this->examen->nombre_examen)
                    ->greeting('¡Hola ' . $this->alumno->name . '!')
                    ->line('Tienes un nuevo examen disponible: ' . $this->examen->nombre_examen . '.')
                    ->line('El examen estará disponible desde: ' . $this->examen->fecha_inicio->format('d/m/Y H:i') . '.')
                    ->line('Hasta: ' . $this->examen->fecha_fin->format('d/m/Y H:i') . '.')
                    ->action('Ver Examen', $url)
                    ->line('¡Mucha suerte!');
    }

    
    public function toArray($notifiable)
    {
        return [
            'examen_id' => $this->examen->id,
            'mensaje' => 'Nuevo examen disponible: ' . $this->examen->nombre_examen,
        ];
    }
}
