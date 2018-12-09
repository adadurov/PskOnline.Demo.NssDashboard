import { PsaSummary } from './psa-summary';
import { RusHydroEmployee } from './rushydro-employee';

export class EmployeeSummaryGroup {

    public employee: RusHydroEmployee;

    public bestItem: PsaSummary;

    public otherItems: PsaSummary[];
}
