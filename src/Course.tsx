import Clazz from "./Clazz";

let uuid = require("uuid");

class Course {
    private code: string;
    private title: string;
    private group: string;
    private clazz: Array<Clazz>;
    private courseStartDate: string;

    constructor(code: string, title: string, group: string, courseStartDate: string) {
        this.code = code;
        this.title = title;
        this.group = group;
        this.courseStartDate = courseStartDate;
        this.clazz = new Array<Clazz>();
    }

    addClazz(clazz: Clazz) {
        this.clazz.push(clazz);
    }

    processToVEVENT() {
        let vevents: Array<string> = [];

        for (const c of this.clazz) {
            let singleEvent: boolean = false;
            let scheduleType: number = c.getClazzScheduleType();
            let start: Date = new Date(this.courseStartDate);
            let lessonPeriod: Array<string> = c.getTimePeriod();

            let startBeforeRecess: Date = new Date(start);
            startBeforeRecess.setDate(start.getDate() + c.getDayOfWeek() + (7 * c.getStartWeekBeforeRecess()));
            let startBeforeRevision: Date = new Date(start);
            startBeforeRevision.setDate(start.getDate() + c.getDayOfWeek() + (7 * c.getStartWeekAfterRecess()));

            let endBeforeRecess: Date = new Date(start);
            let endBeforeRevision: Date = new Date(start);

            // if it only one week arrangement
            if (c.getLastWeekBeforeRecess() === undefined || c.getLastWeekBeforeRevision() === undefined) {
                singleEvent = true;
                endBeforeRecess.setDate(startBeforeRecess.getDate());
                endBeforeRevision.setDate(startBeforeRevision.getDate());
            } else {
                endBeforeRecess.setDate(start.getDate() + c.getDayOfWeek() + (7 * c.getLastWeekBeforeRecess()) + 1);
                endBeforeRevision.setDate(start.getDate() + c.getDayOfWeek() + (7 * c.getLastWeekBeforeRevision()) + 1);
            }

            let uid: string = uuid.v4();
            let title: string = this.title;
            let clazzType: string = c.getClazzType();
            let courseCode: string = this.code;
            let clazzGroup: string = this.group;
            let clazzLocation: string = c.getClazzLocation();
            let dtStart: string = this.toISODate(startBeforeRecess, lessonPeriod[0]);
            let dtEnd: string = this.toISODate(startBeforeRecess, lessonPeriod[1]);
            let dtStamp: string = this.toISODate(start, "0000");
            let dtUntil: string = this.toISODate(endBeforeRecess, "0000");

            // before recess week
            vevents.push(
                `BEGIN:VEVENT\n` +
                `UID:${uid}\n` +
                `SUMMARY:[${courseCode}] ${title} ${clazzType}\n` +
                `DESCRIPTION:Group\: ${clazzGroup}\\nLocation\: ${clazzLocation}\n` +
                `DTSTART:${dtStart}\n` +
                `DTEND:${dtEnd}\n` +
                `DTSTAMP:${dtStamp}\n` +
                `${ (!singleEvent) ? `RRULE:FREQ=WEEKLY;INTERVAL=${scheduleType};UNTIL=${dtUntil}\n` : '' }` +
                `END:VEVENT\n`);

            if (!singleEvent) {
                uid = uuid.v4();
                dtStart = this.toISODate(startBeforeRevision, lessonPeriod[0]);
                dtEnd = this.toISODate(startBeforeRevision, lessonPeriod[1]);
                dtUntil = this.toISODate(endBeforeRevision, "0000");

                // before revision/exam
                vevents.push(
                    `BEGIN:VEVENT\n` +
                    `UID:${uuid.v4()}\n` +
                    `SUMMARY:[${courseCode}] ${title} ${clazzType}\n` +
                    `DESCRIPTION:Group\: ${clazzGroup}\\nLocation\: ${clazzLocation}\n` +
                    `DTSTART:${dtStart}\n` +
                    `DTEND:${dtEnd}\n` +
                    `DTSTAMP:${dtStamp}\n` +
                    `RRULE:FREQ=WEEKLY;INTERVAL=${scheduleType};UNTIL=${dtUntil}\n` +
                    `END:VEVENT\n`);
            }
        }

        return vevents.reduce((x, y) => x + y);
    }

    private toISODate(date: Date, period: string) {
        let datetime: string = date.toISOString().replaceAll(/[-:.Z]|(.{12}Z)$/g, "");

        if (period.length > 0) {
            datetime += period + "00";
        }

        return datetime;
    }

    private formatCourseTitle() {
        return (this.title.length > 40) ?
            this.title.slice(0, 39) + "\n\t" + this.title.slice(39, this.title.length) :
            this.title;
    }
}

export default Course;