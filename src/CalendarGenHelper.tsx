import Course from "./Course";
import Clazz from "./Clazz";
import {ClazzType} from "./ClazzType";

class CalendarGenHelper {
    private startDate: Date;
    private courseSchedule: string;

    constructor(startDate: Date, courseSchedule: string) {
        this.startDate = startDate;
        this.courseSchedule = courseSchedule;
        this.processCourseSchedule();
    }

    processCourseSchedule() {
        // @ts-ignore
        let moduleCodes: Array<string> = ([...this.courseSchedule.matchAll(/\w{2}\d{4}/g)]);
        let moduleDetails: Array<Array<string>> = [];
        let details: string = "";

        for (let i: number = 0; i < moduleCodes.length; i++) {
            let start: number = this.courseSchedule.indexOf(moduleCodes[i]);

            let end: number = ((i+1) === moduleCodes.length) ?
                this.courseSchedule.length : this.courseSchedule.indexOf(moduleCodes[i+1]);

            details = this.courseSchedule.slice(start, end - 1);

            moduleDetails.push(details.replaceAll("\n", "\t").split("\t"));
        }

        let courses: Array<Course> = [];
        let clazzDetailStartIdx: number = 9;
        let intervalIdx: number = 6;

        // [0] - Module Code
        // [1] - Title
        // [10] - Group
        for (let md of moduleDetails) {
            let group: string = md[clazzDetailStartIdx + 1];

            if (group.trim() != "")
            {
                let startDate: string = this.startDate.toString();
                let c: Course = new Course(md[0], md[1], group, startDate);
                let numTypeClazz: number = md.filter(x => x in ClazzType).length;

                // [0] - Type of Class
                // [1] - Group
                // [2] - Day of Class
                // [3] - Period
                // [4] - Location
                // [5] - Teaching Period
                for (let i: number = 1; i <= numTypeClazz; i += 1, clazzDetailStartIdx += intervalIdx) {
                    let clazz: Clazz = new Clazz(md[clazzDetailStartIdx + 2], md[clazzDetailStartIdx + 4], md[clazzDetailStartIdx], md[clazzDetailStartIdx + 5], md[clazzDetailStartIdx + 3]);
                    c.addClazz(clazz);
                }

                courses.push(c);
                clazzDetailStartIdx = 9;
            }
        }

        let clazzes: Array<string> = [];
        courses.forEach((c) => clazzes.push(c.processToVEVENT()));
        let combinedClazzList = clazzes.reduce((x, y) => x + y);

        return this.exportCalendar(combinedClazzList);
    }

    private exportCalendar(clazzes: string) {
        let calendar: string = (
            `BEGIN:VCALENDAR\n` +
            `VERSION:2.0\n` +
            `PRODID:-//xinweilau//NTU Timetable Exporter 1.0//EN\n` +
            `CALSCALE:GREGORIAN\n` +
            `METHOD:PUBLISH\n` +
            `${clazzes}` +
            `END:VCALENDAR`
        );

        // TODO: Continue with Export File
        // <a href="data:application/octet-stream;charset=utf-16le;base64,//5mAG8AbwAgAGIAYQByAAoA">text file</a>
        return calendar;
    }
}

export default CalendarGenHelper;