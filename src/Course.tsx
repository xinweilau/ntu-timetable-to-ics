import Clazz from "./Clazz";

let uuid = require("uuid");

class Course {
    private code: string;
    private title: string;
    private group: string;
    private clazz: Array<Clazz>;

    constructor(code: string, title: string, group: string) {
        this.code = code;
        this.title = title;
        this.group = group;
        this.clazz = new Array<Clazz>();
    }

    addClazz(clazz: Clazz) {
        this.clazz.push(clazz);
    }

    processToVEVENT() {
        let vevents: Array<string> = [];

        for (const c of this.clazz) {
            let scheduleType: number = c.getClazzScheduleType();
            let today: Date = new Date("2021-08-09"); // TODO: replace date

            let startBeforeRecess: Date = new Date();
            startBeforeRecess.setDate(today.getDate() + c.getDayOfWeek() + (7 * c.getStartWeekBeforeRecess()));
            let startBeforeRevision: Date = new Date();
            startBeforeRevision.setDate(today.getDate() + c.getDayOfWeek() + (7 * c.getStartWeekAfterRecess()));

            let endBeforeRecess: Date = new Date();
            endBeforeRecess.setDate(today.getDate() + c.getDayOfWeek() + (7 * c.getLastWeekBeforeRecess()));
            let endBeforeRevision: Date = new Date();
            endBeforeRevision.setDate(today.getDate() + + c.getDayOfWeek() + (7 * c.getLastWeekBeforeRevision()));

            let uid: string = uuid.v4();
            let title: string = this.title;
            let clazzType: string = c.getClazzType();
            let courseCode: string = this.code;
            let clazzGroup: string = this.group;
            let clazzLocation: string = c.getClazzLocation();
            let dtStart: string = this.toISODate(startBeforeRecess);
            let dtEnd: string = this.toISODate(startBeforeRecess);
            let dtStamp: string = this.toISODate(today);
            let dtUntil: string = this.toISODate(endBeforeRecess);

            // before recess week
            vevents.push(
                `BEGIN:VEVENT\n` +
                `UID:${uid}\n` +
                `SUMMARY:[${courseCode}] ${title} ${clazzType}\n` +
                `DESCRIPTION:Group\: ${clazzGroup}\\nLocation\: ${clazzLocation}\n` +
                `DTSTART:${dtStart}\n` +
                `DTEND:${dtEnd}\n` +
                `DTSTAMP:${dtStamp}\n` +
                `RRULE:FREQ=WEEKLY;INTERVAL=${scheduleType};UNTIL=${dtUntil}\n` +
                `END:VEVENT\n`);

            uid = uuid.v4();
            dtStart = this.toISODate(startBeforeRevision);
            dtEnd = this.toISODate(endBeforeRevision);
            dtUntil = this.toISODate(endBeforeRevision);

            // before revision/exam
            vevents.push(
                `BEGIN:VEVENT\n` +
                `UID:${uuid.v4()}\n` +
                `SUMMARY:[${courseCode}] ${title} ${clazzType}\n` +
                `DESCRIPTION:Group\:${clazzGroup}\nLocation\:${clazzLocation}\n` +
                `DTSTART:${dtStart}\n` +
                `DTEND:${dtEnd}\n` +
                `DTSTAMP:${dtStamp}\n` +
                `RRULE:FREQ=WEEKLY;INTERVAL=${scheduleType};UNTIL=${dtUntil}\n` +
                `END:VEVENT\n`);
        }

        return vevents.reduce((x, y) => x + y);
    }

    private toISODate(date: Date) {
        return date.toISOString().replaceAll(/[-:.Z]|(.{3}Z)$/g, "");
    }

    private formatCourseTitle() {
        return (this.title.length > 40) ?
            this.title.slice(0, 39) + "\n\t" + this.title.slice(39, this.title.length) :
            this.title;
    }
}

export default Course;