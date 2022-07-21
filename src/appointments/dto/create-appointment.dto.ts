export class CreateAppointmentDto {
  readonly userId: string    
  readonly doctorId: string
  readonly slot: Date
}