App.controller("ToDoCtrl", function($scope, $http) {

  /* Model */

  $scope.categoryIndex = 0;
  $scope.categoryList = [];
  $scope.showDetails = false;

  /* Category functions */

  $scope.changeCategory = function(index) {
    $scope.categoryIndex = index;
    $scope.categoryTotal = $scope.categoryList[$scope.categoryIndex].toDoList.length + $scope.categoryList[$scope.categoryIndex].toDoListDone.length;
    $scope.categoryTotalUndone = $scope.categoryList[$scope.categoryIndex].toDoList.length;
    $scope.save();
  };

  $scope.addCategory = function() {

    if ($scope.newCategoryTitle !== null) {
      $scope.categoryList.push({
        title: $scope.newCategoryTitle,
        toDoList: [],
        toDoListDone: []
      });
      $scope.totalCategories++;
    }
    $scope.newCategoryTitle = "";
    $scope.save();
  };

  $scope.removeCategory = function(index) {
    if (index !== 0) {
      $scope.categoryList.splice(index, 1);
      $scope.totalCategories--;
    }
    $scope.save();
  };

  /* Task functions */

  $scope.addTask = function() {

    if ($scope.newTaskText !== null) {
      $scope.categoryList[$scope.categoryIndex].toDoList.push({
        taskText: $scope.newTaskText,
        subtasks: [],
        comments: [],
        deadline: $scope.deadline,
        isDone: false
      });
      $scope.newTaskText = "";
      $scope.categoryTotal++;
      $scope.categoryTotalUndone++;
    }
    $scope.save();

  };

  $scope.removeTask = function(index) {
    $scope.categoryList[$scope.categoryIndex].toDoList.splice(index, 1);
    $scope.categoryTotal--;
    $scope.categoryTotalUndone--;
    $scope.save();
  };

  $scope.changeDone = function(index) {
    var isDone = !this.isDone;
    var taskText = $scope.categoryList[$scope.categoryIndex].toDoList[index].taskText;

    $scope.categoryList[$scope.categoryIndex].toDoList.splice(index, 1);
    $scope.categoryList[$scope.categoryIndex].toDoListDone.push({
      taskText: taskText,
      isDone: isDone
    });
    $scope.categoryTotalUndone--;
    $scope.save();
  };

  $scope.removeDoneTasks = function() {
    var j = $scope.categoryList[$scope.categoryIndex].toDoListDone.length;

    $scope.categoryTotal = $scope.categoryTotal - j;

    while ($scope.categoryList[$scope.categoryIndex].toDoListDone.length !== 0) {
      $scope.categoryList[$scope.categoryIndex].toDoListDone.splice(j, 1);
      j--;
    }
    $scope.save();
  };

  $scope.removeAllTasks = function() {

    var i = $scope.categoryList[$scope.categoryIndex].toDoList.length;

    while ($scope.categoryList[$scope.categoryIndex].toDoList.length !== 0) {
      $scope.categoryList[$scope.categoryIndex].toDoList.splice(i, 1);
      i--;
    }

    $scope.removeDoneTasks();

    $scope.categoryTotal = 0;
    $scope.categoryTotalUndone = 0;
    $scope.save();
  };

  /* Details functions */

  $scope.addSubTask = function(index, subTaskText) {
    $scope.categoryList[$scope.categoryIndex].toDoList[index].subtasks.push({
      subtaskText: subTaskText
    });
    $(".add-sub-task").val("");
    $scope.save();
  };

  $scope.removeSubTask = function(index, subIndex) {
    $scope.categoryList[$scope.categoryIndex].toDoList[index].subtasks.splice(subIndex, 1);
    $scope.save();
  };

  $scope.addComment = function(index, commentText) {
    $scope.categoryList[$scope.categoryIndex].toDoList[index].comments.push({
      comment: commentText
    });
    $(".comment-text").val("");
    $scope.save();
  };

  $scope.removeComment = function(index, subIndex) {
    $scope.categoryList[$scope.categoryIndex].toDoList[index].comments.splice(subIndex, 1);
    $scope.save();
  };

  /* Save/load functions */

  $scope.save = function() {
    var data = angular.toJson($scope.categoryList);
    $.post("/save", {
      data: data
    });
  };

  $scope.load = function() {
    $http({
      method: 'GET',
      url: 'data/data.json'
    }).then(function(response) {
      $scope.categoryList = angular.fromJson(response.data);
      $scope.categoryTotal = $scope.categoryList[$scope.categoryIndex].toDoList.length + $scope.categoryList[$scope.categoryIndex].toDoListDone.length;
      $scope.categoryTotalUndone = $scope.categoryList[$scope.categoryIndex].toDoList.length;
      $scope.totalCategories = $scope.categoryList.length;
    });
  };

  $scope.load();
  $("#new-task-input").focus();

});
