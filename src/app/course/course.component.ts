import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, timeout} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course: Course;
    dataSource = new MatTableDataSource([]);
    // ! ==> matColumnDef / matHeaderRowDef / matRowDef
    displayedColumns = ["seqNo", "description", "duration"];

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];
        console.error(this.course);
        this.coursesService.findAllCourseLessons(this.course.id)
          .subscribe(lessons => this.dataSource.data = lessons);

    }

    ngAfterViewInit() {

    }

  searchLessons(search: string = '') {
    this.dataSource.filter = search.toLowerCase().trim();
  console.error(this.dataSource.filter);
    }
}
