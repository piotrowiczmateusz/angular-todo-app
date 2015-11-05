App.controller("ToDoCtrl", function($scope, $http) {
    		
            /* Model */

            $scope.categoryIndex = 0;

            $scope.categoryList = [
                
                {
                title: 'General', 
                toDoList: [
                    {
                    taskText: 'task 1',             
                    subtasks: [{subtaskText: 'yolo'}],
                    comments: [{comment: 'super komentarz'}],
                    deadline: '1999-04-26',
                    isDone: false
                    }
                ], 
                toDoListDone: [
                    {taskText: 'task 1 done', isDone: true}
                ]
                }, 
                
               
                {
                title: 'Work', 
                toDoList: [
                    {taskText: 'task 1', isDone: false}
                ], 
                toDoListDone: []
                }

            ];
	
       
            $scope.categoryTotal = $scope.categoryList[$scope.categoryIndex].toDoList.length + $scope.categoryList[$scope.categoryIndex].toDoListDone.length;
            $scope.categoryTotalUndone = $scope.categoryList[$scope.categoryIndex].toDoList.length;

            $scope.totalCategories = $scope.categoryList.length;
    		
            $scope.showDetails = false;

            
            /* Category functions */

            $scope.changeCategory = function(index) {
                $scope.categoryIndex = index;
                $scope.categoryTotal = $scope.categoryList[$scope.categoryIndex].toDoList.length + $scope.categoryList[$scope.categoryIndex].toDoListDone.length;
                $scope.categoryTotalUndone = $scope.categoryList[$scope.categoryIndex].toDoList.length;
            };

            $scope.addCategory = function() {
                
                if($scope.newCategoryTitle != null) {
                    $scope.categoryList.push({title: $scope.newCategoryTitle, toDoList: [], toDoListDone: []});
                    $scope.totalCategories++;
                }
                $scope.newCategoryTitle = "";
                
            };

            $scope.removeCategory = function(index) {
                if(index != 0) {
                    $scope.categoryList.splice(index, 1);
                    $scope.totalCategories--;
                }                
            }

            /* Task functions */

    		$scope.addTask = function() {
               
                if($scope.newTaskText != null) {
                    $scope.categoryList[$scope.categoryIndex].toDoList.push({
                        taskText: $scope.newTaskText, 
                        subtasks: [],
                        comments: [],
                        deadline: 'asda',
                        isDone: false
                    });
                    $scope.newTaskText = ""; 
                    $scope.categoryTotal++;
                    $scope.categoryTotalUndone++;
                }
    							
    		};

    		$scope.removeTask = function (index) {
            	//tutaj trzeba jeszcze cos zrobic
                $scope.categoryList[$scope.categoryIndex].toDoList.splice(index, 1);
    			$scope.categoryTotal--;
            //    $scope.categoryTotalUndone--;
			};

			$scope.changeDone = function(index) {
				
				var isDone = !this.isDone;
				var taskText = $scope.categoryList[$scope.categoryIndex].toDoList[index].taskText;
				
			    $scope.categoryList[$scope.categoryIndex].toDoList.splice(index, 1);
			   	$scope.categoryList[$scope.categoryIndex].toDoListDone.push({taskText: taskText, isDone: isDone});
                $scope.categoryTotalUndone--;
			};

            $scope.removeDoneTasks = function() {
                var j = $scope.categoryList[$scope.categoryIndex].toDoListDone.length;

                $scope.categoryTotal = $scope.categoryTotal - j;

                while($scope.categoryList[$scope.categoryIndex].toDoListDone.length != 0) {
                    $scope.categoryList[$scope.categoryIndex].toDoListDone.splice(j, 1);
                    j--;
                }
            }

			$scope.removeAllTasks = function() {
				
                var i = $scope.categoryList[$scope.categoryIndex].toDoList.length;
				
				while($scope.categoryList[$scope.categoryIndex].toDoList.length != 0) {
					$scope.categoryList[$scope.categoryIndex].toDoList.splice(i, 1);
					i--;
				}

                $scope.removeDoneTasks();

                 $scope.categoryTotal = 0;
                 $scope.categoryTotalUndone = 0;

			};

			$scope.showDetails = function() {
				$scope.showDetails = !$scope.showDetails;
			};

            /* Details functions */

            $scope.addSubTask = function(index) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].subtasks.push({subtaskText: $scope.kurwa});
            };

            $scope.removeSubTask = function(index, subIndex) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].subtasks.splice(subIndex, 1);
            };

            $scope.addComment = function(index) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].comments.push({comment: 'nowy komentarz'});
            };

            $scope.removeComment = function(index, subIndex) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].comments.splice(subIndex, 1);
            };

    		
            $scope.save = function() {
                var data = $scope.categoryList;
                $http.post('data/json.html', data).then(
                    function() {
                        alert("succes");
                }, function() {
                    alert("error");
                    }
                
            )};

    	});
var App = angular.module("App", []);
App.controller("ToDoCtrl", function($scope, $http) {
    		
            /* Model */

            $scope.categoryIndex = 0;

            $scope.categoryList = [
                
                {
                title: 'General', 
                toDoList: [
                    {
                    taskText: 'task 1',             
                    subtasks: [{subtaskText: 'yolo'}],
                    comments: [{comment: 'super komentarz'}],
                    deadline: '1999-04-26',
                    isDone: false
                    }
                ], 
                toDoListDone: [
                    {taskText: 'task 1 done', isDone: true}
                ]
                }, 
                
               
                {
                title: 'Work', 
                toDoList: [
                    {taskText: 'task 1', isDone: false}
                ], 
                toDoListDone: []
                }

            ];
	
       
            $scope.categoryTotal = $scope.categoryList[$scope.categoryIndex].toDoList.length + $scope.categoryList[$scope.categoryIndex].toDoListDone.length;
            $scope.categoryTotalUndone = $scope.categoryList[$scope.categoryIndex].toDoList.length;

            $scope.totalCategories = $scope.categoryList.length;
    		
            $scope.showDetails = false;

            
            /* Category functions */

            $scope.changeCategory = function(index) {
                $scope.categoryIndex = index;
                $scope.categoryTotal = $scope.categoryList[$scope.categoryIndex].toDoList.length + $scope.categoryList[$scope.categoryIndex].toDoListDone.length;
                $scope.categoryTotalUndone = $scope.categoryList[$scope.categoryIndex].toDoList.length;
            };

            $scope.addCategory = function() {
                
                if($scope.newCategoryTitle != null) {
                    $scope.categoryList.push({title: $scope.newCategoryTitle, toDoList: [], toDoListDone: []});
                    $scope.totalCategories++;
                }
                $scope.newCategoryTitle = "";
                
            };

            $scope.removeCategory = function(index) {
                if(index != 0) {
                    $scope.categoryList.splice(index, 1);
                    $scope.totalCategories--;
                }                
            }

            /* Task functions */

    		$scope.addTask = function() {
               
                if($scope.newTaskText != null) {
                    $scope.categoryList[$scope.categoryIndex].toDoList.push({
                        taskText: $scope.newTaskText, 
                        subtasks: [],
                        comments: [],
                        deadline: 'asda',
                        isDone: false
                    });
                    $scope.newTaskText = ""; 
                    $scope.categoryTotal++;
                    $scope.categoryTotalUndone++;
                }
    							
    		};

    		$scope.removeTask = function (index) {
            	
                //tutaj trzeba jeszcze cos zrobic
                
                $scope.categoryList[$scope.categoryIndex].toDoList.splice(index, 1);
    			$scope.categoryTotal--;
            //    $scope.categoryTotalUndone--;
                
			};

			$scope.changeDone = function(index) {
				
				var isDone = !this.isDone;
				var taskText = $scope.categoryList[$scope.categoryIndex].toDoList[index].taskText;
				
			    $scope.categoryList[$scope.categoryIndex].toDoList.splice(index, 1);
			   	$scope.categoryList[$scope.categoryIndex].toDoListDone.push({taskText: taskText, isDone: isDone});
                $scope.categoryTotalUndone--;
			};

            $scope.removeDoneTasks = function() {
                var j = $scope.categoryList[$scope.categoryIndex].toDoListDone.length;

                $scope.categoryTotal = $scope.categoryTotal - j;

                while($scope.categoryList[$scope.categoryIndex].toDoListDone.length != 0) {
                    $scope.categoryList[$scope.categoryIndex].toDoListDone.splice(j, 1);
                    j--;
                }
            }

			$scope.removeAllTasks = function() {
				
                var i = $scope.categoryList[$scope.categoryIndex].toDoList.length;
				
				while($scope.categoryList[$scope.categoryIndex].toDoList.length != 0) {
					$scope.categoryList[$scope.categoryIndex].toDoList.splice(i, 1);
					i--;
				}

                $scope.removeDoneTasks();

                 $scope.categoryTotal = 0;
                 $scope.categoryTotalUndone = 0;

			};

			$scope.showDetails = function() {
				$scope.showDetails = !$scope.showDetails;
			};

            /* Details functions */

            $scope.addSubTask = function(index) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].subtasks.push({subtaskText: $scope.kurwa});
            };

            $scope.removeSubTask = function(index, subIndex) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].subtasks.splice(subIndex, 1);
            };

            $scope.addComment = function(index) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].comments.push({comment: 'nowy komentarz'});
            };

            $scope.removeComment = function(index, subIndex) {
                $scope.categoryList[$scope.categoryIndex].toDoList[index].comments.splice(subIndex, 1);
            };

    		
            $scope.save = function() {
                var data = $scope.categoryList;
                $http.post('data/json.html', data).then(
                    function() {
                        alert("succes");
                }, function() {
                    alert("error");
                    }
                
            )};

    	});