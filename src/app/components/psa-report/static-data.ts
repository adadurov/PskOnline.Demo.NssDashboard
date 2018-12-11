import { PsaReport } from './../../psa-models/psa-report';
import { RusHydroEmployee } from './../../psa-models/rushydro-employee';
import { PsaFinalConclusion } from './../../psa-models/psa-final-conclusion';
import { SvmrPreShiftConclusion } from './../../psa-models/svmr-pre-shift-conclusion';
import { PsaStatus } from './../../psa-models/psa-status';
import { HrvPreShiftConclusion } from './../../psa-models/hrv-pre-shift-conclusion';
import { LSR_HrvFunctionalState } from './../../psa-models/lsr-hrv-functional-state';
import { PsaSummary } from './../../psa-models/psa-summary';

export class StaticData {
    public static get REPORT(): PsaReport {

        const branchOfficeId = '24098234092';
        const departmentId = '03498263223';

        const completionTime = new Date();
        const workingShiftDate = new Date();

        const employee1: RusHydroEmployee = {
            externalId: '123',
            fullName: 'Перельман Игорь Витальевич',
            id: '2298345',
            positionName: 'Электромонтер главного щита управления',
        };

        const employee2: RusHydroEmployee = {
            externalId: '123',
            fullName: 'Михайлов Александрович Романович',
            id: '983459282',
            positionName: 'Начальник смены цеха',
        };

        const employee3: RusHydroEmployee = {
            externalId: '123',
            fullName: 'Кравцов Виталий Андреевич',
            id: '345122',
            positionName: 'Машинист гидротурбинного оборудования',
        };

        const aFinalConclusion: PsaFinalConclusion = {
            color: '00bbbb',
            comment: '',
            status: PsaStatus.Conditional_Pass,
            text: 'Частично соответствует'
        };

        const anSvmrConclusion: SvmrPreShiftConclusion = {
            testId: 'aowei20234',
            color: '00bbbb',
            comment: '',
            status: PsaStatus.Conditional_Pass,
            text: 'Условно пройдено',
            meanResponseTimeMSec: 239,
            ipN1: 63.9
        };

        const anHrvConclusion: HrvPreShiftConclusion = {
            testId: 'aowei20234',
            color: '00bbbb',
            comment: '',
            status: PsaStatus.Conditional_Pass,
            text: 'Условно пройдено',
            in: 123.4,
            vsr: 0.35,
            lsr: LSR_HrvFunctionalState.Acceptable_3,
            lsR_Text: 'Приемлемое',
            stateMatrixCol: 2,
            stateMatrixRow: 2,
            meanHR: 89.1
        };

        const aBadSummary: PsaSummary = {
            id: 'sldf0202947398754',
            inspectionId: 'qwertuyuiop',
            branchOfficeId: branchOfficeId,
            departmentId: departmentId,
            hostName: 'sb12345',
            toolVersion: 'PskOnline.Client.Demo/0.1.7',
            employee: employee3,
            finalConclusion: {
                color: '00dd00',
                comment: '',
                status: PsaStatus.Fail,
                text: 'НЕ СООТВЕТСТВУЕТ'
            },
            svmrConclusion: anSvmrConclusion,
            hrvConclusion: anHrvConclusion,
            workingShiftNumber: 1,
            completionTime: completionTime,
            workingShiftDate: workingShiftDate
        };

        const aBetterSummary: PsaSummary = {
            id: 'sldf0202947398754',
            inspectionId: 'qwertuyuiop',
            branchOfficeId: branchOfficeId,
            departmentId: departmentId,
            hostName: 'sb12345',
            toolVersion: 'PskOnline.Client.Demo/0.1.7',
            employee: employee2,
            finalConclusion: aFinalConclusion,
            svmrConclusion: anSvmrConclusion,
            hrvConclusion: anHrvConclusion,
            workingShiftNumber: 1,
            completionTime: completionTime,
            workingShiftDate: workingShiftDate
        };

        const theBestSummary: PsaSummary = {
            id: 'sldf0202947398754',
            inspectionId: 'qwertuyuiop',
            branchOfficeId: branchOfficeId,
            departmentId: departmentId,
            hostName: 'sb12345',
            toolVersion: 'PskOnline.Client.Demo/0.1.7',
            employee: employee1,
            finalConclusion: {
                color: '00dd00',
                comment: '',
                status: PsaStatus.Pass,
                text: 'Полностью соответствует'
            },
            svmrConclusion: anSvmrConclusion,
            hrvConclusion: anHrvConclusion,
            workingShiftNumber: 1,
            completionTime: completionTime,
            workingShiftDate: workingShiftDate
        };

        return {
            branchOfficeId: branchOfficeId,
            departmentId: departmentId,
            branchOfficeName: 'Демо ГЭС',
            departmentName: 'Турбинный цех',
            shiftDate: workingShiftDate,
            shiftName: 'день',
            shiftNumber: 1,
            shiftStartTime: '07:00:00.000',
            summaries: [aBadSummary, aBetterSummary, theBestSummary]
        };
    }

}
