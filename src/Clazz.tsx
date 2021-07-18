import {ClazzType} from "./ClazzType";
import {ClazzSchedule} from "./ClazzSchedule";
import {DayOfWeek} from "./DayOfWeek";

class Clazz {
    private weekOfSemester: Array<number>;
    private dayOfWeek: string;
    private location: string;
    private clazzType: ClazzType;
    private clazzSchedule: ClazzSchedule;
    private timePeriod: Array<string>;

    constructor(dayOfWeek: string, location: string, clazzType: string, teachingPeriod: string, timePeriod: string) {
        this.dayOfWeek = dayOfWeek;
        this.location = location;
        // @ts-ignore
        this.clazzType = ClazzType[clazzType];
        this.timePeriod = this.processTimePeriod(timePeriod);
        this.weekOfSemester = [];
        this.clazzSchedule = ClazzSchedule.CONSECUTIVE;

        this.parseTeachingPeriod(teachingPeriod);
        //this.setClazzSchedule(this.weekOfSemester);
    }

    private parseTeachingPeriod(teachingPeriod: string) {
        let period: string = teachingPeriod.slice(teachingPeriod.indexOf("k") + 1, teachingPeriod.length);

        // Teaching Wk2,4,6,8,10,12 or Teaching Wk1-13
        if (period.indexOf("-") !== -1)
        {
            let start: number = parseInt(period[0]);
            let end: number = parseInt(period.slice(2, period.length));

            for (let i:number = start; i <= end + 1; i++) {
                // Week 8 is Recess Week
                if (i < 8)
                    this.addWeekOfSemester(i - 1);
                else if (i >= 8)
                    this.addWeekOfSemester(i);
            }
        } else {
            this.weekOfSemester = Array.from(period.split(","), (e : string) => {
                // @ts-ignore
                let weekNum: number = parseInt(e);
                if (weekNum < 8)
                    return weekNum - 1;
                else
                    return weekNum;
            });

            // TODO: Shift somewhere more appropriate
            this.setClazzSchedule2(ClazzSchedule.ALTERNATE);
        }
    }

    private addWeekOfSemester(week: number) {
        this.weekOfSemester.push(week);
    }

    /**
     * @deprecated The method is no longer working as intended.
     */
    private setClazzSchedule(weekOfSemester: Array<number>) {
        let start: number = weekOfSemester[0];
        let total: number = weekOfSemester.reduce((a: number, b: number) => a + b);

        if (((start % 2 == 0) && (total % 2 == 0))) {
            this.clazzSchedule = ClazzSchedule.ALTERNATE;
        } else {
            this.clazzSchedule = ClazzSchedule.CONSECUTIVE;
        }
    }

    private setClazzSchedule2(cs: ClazzSchedule) {
        this.clazzSchedule = cs;
    }

    private processTimePeriod(timePeriod: string) {
        return timePeriod.split("-");
    }

    getTimePeriod() {
        return this.timePeriod;
    }

    getClazzScheduleType() {
        return this.clazzSchedule;
    }

    getClazzType() {
        return this.clazzType;
    }

    getClazzLocation() {
        return this.location;
    }

    getDayOfWeek() {
        // @ts-ignore
        return DayOfWeek[this.dayOfWeek];
    }

    getStartWeekBeforeRecess() {
        return this.weekOfSemester[0];
    }

    getLastWeekBeforeRecess() {
        return (this.weekOfSemester.indexOf(6) === -1) ?
            this.weekOfSemester[this.weekOfSemester.indexOf(5)] :
            this.weekOfSemester[this.weekOfSemester.indexOf(6)];
    }

    getStartWeekAfterRecess() {
        return this.weekOfSemester[this.weekOfSemester.indexOf(this.getLastWeekBeforeRecess()) + 1];
    }

    getLastWeekBeforeRevision() {
        return (this.weekOfSemester.indexOf(13) === -1) ?
            this.weekOfSemester[this.weekOfSemester.indexOf(12)] :
            this.weekOfSemester[this.weekOfSemester.indexOf(13)];
    }
}

export default Clazz;