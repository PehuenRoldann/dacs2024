import { Component, Input } from '@angular/core';
import MunicipalDependencies from 'src/app/models/municipalDependencie';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket-creation-modal',
  templateUrl: './ticket-creation-modal.component.html',
  styleUrls: ['./ticket-creation-modal.component.css'],
})
export class TicketCreationModalComponent {
  @Input({ required: true }) modalId!: string;

  public readonly maxLengthDesc: number = 250;
  public processStep: number = 0;
  public ticket = new Ticket();

  /**
   * returns an array with the names of the dependencies
   */
  get MunicipalDependenciesArr() {
    let dependenciesArr: string[] = [];

    for (let dependency of Object.values(MunicipalDependencies)) {
      dependenciesArr.push(dependency);
    }

    return dependenciesArr;
  }

  setDependency(selectedValue: string) {
    const key = Object.keys(MunicipalDependencies).find(
      (k) =>
        MunicipalDependencies[k as keyof typeof MunicipalDependencies] ===
        selectedValue
    );

    if (key) {
      this.ticket.dependency = key as MunicipalDependencies;
    }
  }

  nextStep() {
    this.processStep++;
  }
  prevStep() {
    this.processStep--;
  }

  CancelTicket() {
    this.ticket = new Ticket();
    this.processStep = 0;
  }
}
