import { PsaStatus } from './psa-status';
import { LSR_HrvFunctionalState } from './lsr-hrv-functional-state';

export class HrvPreShiftConclusion {

    /// <summary>
    /// test id from the database where results are stored
    /// </summary>
    public testId: string;

    /// <summary>
    /// status
    /// </summary>
    public status: PsaStatus;

    /// <summary>
    /// text containing verbal representation of status (always in Russian)
    /// </summary>
    public text: string;

    /// <summary>
    /// suggested color for rendering the Text
    /// </summary>
    public color: string;

    /// <summary>
    /// comment (may contain some detailed results, for reference)
    /// </summary>
    public comment: string;


    public lsr: LSR_HrvFunctionalState;

    public lsR_Text: string;

    public vsr: Number;

    /// <summary>
    /// Индекс напряжения
    /// </summary>
    public in: Number;

    public stateMatrixRow: Number;

    public stateMatrixCol: Number;

    /// <summary>
    /// Средняя ЧСС
    /// </summary>
    public meanHR: Number;
}
