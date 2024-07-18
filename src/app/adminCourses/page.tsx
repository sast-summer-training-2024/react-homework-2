'use client'

// CourseSelection.tsx
import React, { useState, useEffect } from 'react';
import { List, Pagination, message, Button, Input } from 'antd';
import 'antd/dist/reset.css';
import styles from './page.module.css';

interface Course {
  id: Number,
  name: String,
  teacher: String,
  department: String,
  time: String
}

const CourseSelection: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  //课程示例
  const [availableCourses, setAvailableCourses] = useState<Course[]>([
    { id: 1, name: '程序设计基础', teacher: '张三', department: '计算机科学与技术', time: '周一 8:00-10:00' },
    { id: 2, name: '面向对象程序设计基础', teacher: '李四', department: '计算机科学与技术', time: '周二 10:00-12:00' },
    { id: 3, name: '计算机系统概率', teacher: '王五', department: '计算机科学与技术', time: '周三 14:00-16:00'},
    { id: 4, name: '软件工程', teacher: '赵六', department: '计算机科学与技术', time: '周四 16:00-18:00'},
    { id: 5, name: '数据结构', teacher: '钱七', department: '计算机科学与技术', time: '周五 8:00-10:00' },
    { id: 6, name: '离散数学(1)', teacher: '孙八', department: '计算机科学与技术', time: '周一 10:00-12:00'},
    { id: 7, name: '离散数学(2)', teacher: '周九', department: '计算机科学与技术', time: '周二 14:00-16:00' },
    { id: 8, name: '原神圣遗物分数计算', teacher: '王司徒', department: '计算机科学与技术', time: '周三 16:00-18:00'},
    { id: 9, name: '崩铁回合与行动机制探究', teacher: '赵铁柱', department: '计算机科学与技术', time: '周四 8:00-10:00' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 每页显示的课程数量

  const handleLogout = () => {
    // TODO: 在这里实现登出逻辑，重定向到初始页面



  };

  const handleUpload = () => {
    // TODO: 在这里实现上传课表和学生信息的逻辑


  };

  const handleDownload = () => {
    // TODO: 在这里实现下载课表和学生信息的逻辑


  };

  //TODO: 实现副作用：向后端请求课程信息

  

  const handleSelectCourse = (course: Course) => {
    if (selectedCourses.some((c) => c.id === course.id)) {
      message.warning('该课程已被选择');
      return;
    }
    setSelectedCourses([...selectedCourses, course]);
    // 从可选课程列表中移除已选择的课程
    if(paginatedCourses.length === 1){
      setCurrentPage(currentPage - 1);
    }
    setAvailableCourses(availableCourses.filter((c) => c.id !== course.id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedCourses = availableCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.container}>
      <div className={styles.courseList}>
        <h2>课程列表</h2>
        <List
          dataSource={paginatedCourses}
          renderItem={(course) => (
            <List.Item
              actions={[<a onClick={() => handleSelectCourse(course)}>选择</a>]}
            >
              {course.name}
            </List.Item>
          )}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={availableCourses.length}
          onChange={handlePageChange}
        />
      </div>


      <div className={styles.logoutButton}>
        <Input type="file" onChange={handleUpload}>
          上传
        </Input>
        <Input type="file" onChange={handleDownload}>
          下载
        </Input>
        <Button type="default" onClick={handleLogout} block>
          登出
        </Button>
      </div>
    </div>
  );
};

export default CourseSelection;
