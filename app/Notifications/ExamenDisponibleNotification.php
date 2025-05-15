<?php

namespace App\Notifications;

use App\Models\Examen; // Asegúrate de que la ruta a tu modelo Examen sea correcta
use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User; // Asegúrate de que la ruta a tu modelo User sea correcta

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

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail']; // Especificamos que esta notificación se enviará por correo
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail(object $notifiable): MailMessage
    {
        // Asumiendo que tienes una ruta para ver el examen, por ejemplo 'alumno.examen.ver'
        // y que tu modelo Examen tiene un campo 'nombre_examen' y 'fecha_inicio'
        $url = route('examenesAlumno', $this->examen->id); // Cambia 'alumno.examen.ver' por tu ruta real

        return (new MailMessage)
                    ->subject('Nuevo Examen Disponible: ' . $this->examen->nombre_examen)
                    ->greeting('¡Hola ' . $this->alumno->name . '!') // Asume que el modelo User tiene un campo 'name'
                    ->line('Tienes un nuevo examen disponible: ' . $this->examen->nombre_examen . '.')
                    ->line('El examen estará disponible desde: ' . $this->examen->fecha_inicio->format('d/m/Y H:i') . '.') // Formatea la fecha como necesites
                    ->line('Hasta: ' . $this->examen->fecha_fin->format('d/m/Y H:i') . '.')
                    ->action('Ver Examen', $url)
                    ->line('¡Mucha suerte!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'examen_id' => $this->examen->id,
            'mensaje' => 'Nuevo examen disponible: ' . $this->examen->nombre_examen,
        ];
    }
}
