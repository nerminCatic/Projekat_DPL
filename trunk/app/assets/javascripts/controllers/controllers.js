'use strict';
var controllers = angular.module('controllers', ['ui.bootstrap']);
// Change language
controllers.controller('LanguageController', function($translate, $scope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
});
// Login
controllers.controller('LoginController', ['$scope','AuthService','AuthToken','$location', 'alertService',
    function($scope, AuthService, AuthToken, $location, alertService){
        if(AuthToken.get()) {
            if(AuthToken.getRole() == "gost")
                $location.path('/home');
            else if(AuthToken.getRole() == "menadzer")
                $location.path('/home_admin');
            else if(AuthToken.getRole() == "Uposlenikd")
                $location.path('/doctor');
            else if(AuthToken.getRole() == "Uposlenikm")
                $location.path('/nerse');
            console.log("Vec ste logovani. Token: " + AuthToken.get());
        }
        $scope.loginUser = function() {
            AuthService.login($scope.user.email, $scope.user.password);
        }
        $scope.openRegistration = function() {
            $location.path('/register');
        }
        $scope.openLogin = function() {
            $location.path('/login');
        }
        $scope.openPassReset = function() {
            $location.path('/password-reset');
        }
}]);
// Home controller
controllers.controller('HomeController', ['$scope','$location','AuthToken',
    function($scope, $location, AuthToken) {
        if(!AuthToken.get()) {
            $location.path('/login');
            console.log("Morate se logovati!");
        }
        if(AuthToken.getRole() == "menadzer") $location.path('/home_admin');
        $scope.userName = AuthToken.getUser();
        $scope.openChangePass = function() {
            $location.path('/changepass');
        }
         $scope.openHome = function() {
            $location.path('/home');
        }
        $scope.logout = function() {
            AuthToken.unset();
            console.log("Log out. Token: " + AuthToken.get());
            $location.path('/login');
        }
}]);
// Doctor controller
controllers.controller('DoctorController', ['$scope','$location','AuthToken',
    function($scope, $location, AuthToken) {
        if(!AuthToken.get()) {
            $location.path('/login');
            console.log("Morate se logovati!");
        }
        if(AuthToken.getRole() == "menadzer") $location.path('/home_admin');
        $scope.userName = AuthToken.getUser();
        $scope.openChangePass = function() {
            $location.path('/changepass');
        }
        $scope.logout = function() {
            AuthToken.unset();
            console.log("Log out. Token: " + AuthToken.get());
            $location.path('/login');
        }
}]);
// Nerse controller
controllers.controller('NerseController', ['$scope','$location','AuthToken',
    function($scope, $location, AuthToken) {
        if(!AuthToken.get()) {
            $location.path('/login');
            console.log("Morate se logovati!");
        }
        if(AuthToken.getRole() == "menadzer") $location.path('/home_admin');
        $scope.userName = AuthToken.getUser();
        $scope.openChangePass = function() {
            $location.path('/changepass');
        }
        $scope.logout = function() {
            AuthToken.unset();
            console.log("Log out. Token: " + AuthToken.get());
            $location.path('/login');
        }
}]);
// Create category
controllers.controller('CreateCategoryController', ['$scope','CreateCategory', '$location', 'alertService',
    function($scope, CreateCategory, $location, alertService) {
        $scope.createCategoryC = function(){
         CreateCategory.create ({name: $scope.category.name, 
         description: $scope.category.description}, 
            function success() {
                alertService.add("success", "Projekat uspješno kreiran!",5000);
                //$location.path('/home_admin');
            }, 
            function err(){
                alertService.add("danger", "Pogrešni podaci!");
                //$location.path('/new_category');
             });
        }
    }
    ]); 


// Create role
controllers.controller('CreateRoleController', ['$scope','CreateRole', '$location',

    function($scope,CreateRole,$location) {

        $scope.createRoleRead = function() {
            $location.path('/add_new_role');
        }

        $scope.createRoleR = function(){
         CreateRole.create ({name: $scope.role.name, 
         description: $scope.role.description}, 
            function success() {
                alert("Rola uspješno kreirana!");
                $location.path('/role_admin');
            }, 
            function err(){
                alert("Pogrešni podaci!"); 
                $location.path('/add_new_role');
             });
        }
    }
    ]);
// Home Admin controller
controllers.controller('HomeAdminController', ['$scope','$location','AuthToken',
    function($scope, $location, AuthToken) {
        if(!AuthToken.get()) {
            $location.path('/login');
            console.log("Morate se logovati!");
        }
        if(AuthToken.getRole() == "gost") $location.path('/home');
        $scope.userName = AuthToken.getUser();
        $scope.openHomeAdmin = function() {
            $location.path('/home_admin');
        }
        $scope.openChangePass = function() {
            $location.path('/changepass_admin');
        }
        $scope.logout = function() {
            AuthToken.unset();
            console.log("Log out. Token: " + AuthToken.get());
            $location.path('/login');
        }
        $scope.openFeedback = function() {
            $location.path('/feedback_admin');
        }
        $scope.openUserManagement = function() {
            $location.path('/user_management');
        }
        $scope.openCategory = function() {
            $location.path('/category_admin');
        }
        $scope.openRoleManagement = function() {
            $location.path('/role_admin');
        }
        $scope.openChartManagement = function() {
            $location.path('/charts');
        }
        $scope.openTask = function() {
            $location.path('/tasks');
        }
        $scope.newTask = function() {
            $location.path('/add_task');
        }
}]);
// Change password
controllers.controller('ChangePassController', ['$scope','ChangePassword', '$location', 'AuthToken' ,
    function($scope,ChangePassword,$location,AuthToken) {
        if(!AuthToken.get()) {
            $location.path('/login');
            console.log("Morate se logovati!");
        }
        $scope.changePass = function(){
         ChangePassword.change_password ({password: $scope.user.password, 
         email: $scope.user.email, new_password: $scope.user.new_password, new_password_confirmation: $scope.user.new_password_confirmation}, 
            function success() {
                alert("Šifra je uspješno promijenjena!");
                $location.path('/login');
            }, 
            function err(){
                alert("Pogrešni podaci!"); 
                $location.path('/changepass');
            });
        }
    }]);
//Registration
controllers.controller('RegistrationController', ['$scope','UserRegister','$location',
    function($scope, UserRegister, $location){
        $scope.registerUser = function(){
            UserRegister.register({user: $scope.user},
                function success() {
                    alert($scope.user.name + ", vaš zahtjev za registracijom je primljen!");
                    $location.path('/login');
                }, 
                function err() {
                alert('Pogrešni podaci!');
                $location.path('/register');
            });
        }
        $scope.openLogin = function() {
            $location.path('/login');
        }
}]);
//Reset passworda - input email-a
controllers.controller('ResetController', ['$scope', 'PassReset', '$location', 
    function($scope, PassReset ,$location){
      $scope.doReset = function(){
        PassReset.create({email: $scope.user.email}, 
            function success() {
                alert("Vaš zahtjev za obnovu šifre je primljen! Upute za obnovu šifre bit će Vam poslane na email");
                $location.path('/inputs-password-reset');
            }, 
            function err() {
                alert('Došlo je do greške. Molim Vas pokušajte ponovo kasnije.');
        });
    }
}]);

// Confirm Reset - Input passworda
controllers.controller('InsertPwdForResetController', ['$scope','$route', '$routeParams', 'InputsPassReset', '$location',
    function($scope, $route, $routeParams, InputsPassReset, $location){
      $scope.doResetConfirm = function(){
        var token = $routeParams.token;
        var obj = new Object();
        obj.password = $scope.user.password;
        obj.password_confirmation = $scope.user.password_confirmation;
        var jsonString= JSON.stringify(obj);
        
        // Prosljedjuje se token, a zatim i objekat (u nasem slucaju json)
        InputsPassReset.update({ token:token }, jsonString, 
            function success() {
                $route.updateParams({});
                alert($route.current.templateUrl);
                $location.path('/login'); 
            }, 
            function err() {
                $route.updateParams({
                    token: 'p'
                });
                alert('Došlo je do greške.');
            });
    }
}]);
//Send Feedback
controllers.controller('FeedbackController', ['$scope','Feedback','$location','alertService',
    function($scope, Feedback, $location, alertService){
       $scope.forms = ['Compliment','Complaint','Suggestion','Comment'];
        $scope.sendFeedback = function(){
            Feedback.send({feedback: $scope.feedback},
                function success() {
                    alertService.add("success", $scope.feedback.name + ", Vaša poruka je primljena, hvala Vam!", 5000);
                    $scope.feedback = null;
                }, 
                function err() {
                    alertService.add("danger", 'Pokušajte ponovo.');
            });
        }
}]);

//Send Reservation
controllers.controller('ReservationController', ['$scope','Reservation', 'AuthToken', 'GetUser', '$location', 'alertService',
    function($scope, Reservation, AuthToken, GetUser, $location, alertService){
        $scope.reservation = {appointment_date:''};
        $scope.users = GetUser.all();
       //alertService.add("success", "Vaše pitanje je dodano.");
       //$scope.forms = ['Compliment','Complaint','Suggestion','Comment'];
        $scope.sendReservation = function(){
            $scope.reservation.user_patient_id = AuthToken.getUserId();
            $scope.reservation.status = "W";

            $scope.reservation.user_doctor_id = $scope.user.id;
            $scope.reservation.appointment_date = $scope.dt;
            var hours = $scope.mytime.getHours();
            var minutes = $scope.mytime.getMinutes();
            $scope.reservation.appointment_date.setHours(hours);
            $scope.reservation.appointment_date.setMinutes(minutes);

            Reservation.send({reservation: $scope.reservation},
                function success() {
                    //alert("Svaka tebi cast");
                    alertService.add("success",AuthToken.getUser() + ", Vaša rezervacija je poslana.", 5000);
                    $scope.reservation = null;
                    $scope.clear();
                }, 
                function err() {
                    //alert("Ljudino, uozbilji se");
                    alertService.add("danger", 'Pokušajte ponovo.');
            });
        }
        $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
     $scope.mytime = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

$scope.mytime = new Date();
$scope.mytime.setHours( 8 );
$scope.mytime.setMinutes( 0 );
  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.ismeridian = false;
 
  $scope.update = function() {
    var d = new Date();
    d.setHours( 8 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
   // $log.log('Time changed to: ' + $scope.mytime);
  };

 /* $scope.clear = function() {
    $scope.mytime = null;
  };*/
}]);

// Questions controller
controllers.controller('QuestionsController', ['$scope', 'alertService','Category', 'User', 'Question', 'UpdateQuestion', 'DeleteQuestion','AuthToken','$location',
    function($scope, alertService, Category, User, Question, UpdateQuestion, DeleteQuestion, AuthToken, $location) {
      $scope.categories = Category.query();
      $scope.users = User.query();
      $scope.questions = Question.query();
      $scope.top_questions = Question.query({filter: "Top"});
      $scope.question = new Question();
      $scope.createQuestion = function() {
        $scope.question.category_id = $scope.category.id;
        $scope.question.uposlenik_id = $scope.user.id;
        Question.save($scope.question,
            function success() {
                var user = AuthToken.getUser();
                alertService.add("success", "Vaš zadatak je dodan.", 5000);
                $location.path('/questions');
                $scope.question= null;
            }, 
            function err() {
                alertService.add("danger", "Desila se greška pri unosu.", 5000);
                $location.path('/add_question');
            });
      }
      $scope.newQuestion = function() {
        $location.path('/add_question');
      }
      $scope.openQuestions = function() {
        $location.path('/questions');
      }
      $scope.showQuestion = function(question_id) {
        $location.path('/questions/'+question_id);
      }
      $scope.editQuestion = function() {
            
        var obj = new Object();
        obj.name = $scope.question.name;
        obj.description = $scope.question.description;
        obj.user_id = $scope.question.user_id;
        obj.category_id = $scope.question.category_id;
        obj.zavrseno = $scope.question.zavrseno;
        obj.uposlenik_id = $scope.question.uposlenik_id;
        var jsonString= JSON.stringify(obj);
        // Posto se radi o metodi PUT, na ovaj nacin se prosljedjuje id, a zatim i objekat (u nasem slucaju json)
        UpdateQuestion.update({ id:$scope.question.id }, jsonString, 
            function success() {
                alert('Podaci o korisniku su uspješno izmijenjeni.');
                $location.path('/questions'); 
                // TBD SharedUser set to null
            }, 
            function err() {
                alert('Došlo je do tehničke greške.');
                $location.path('/questions'+question_id);
            });
        };
      // ne radi
      $scope.deleteQuestion= function(id, idx) {
        $scope.questions.splice(idx, 1);
        DeleteQuestion.destroy({id: id},
            function success() {
                alert("Izbrisano");
                $location.path('/questions');
            }, 
            function err() {
                alert('Greška!');
            });
      }
}]);
// Comments controller
controllers.controller('CommentsController', ['$scope','AuthToken','Comment', 'Question','$routeParams','$location', 'alertService',
    function($scope, AuthToken, Comment, Question, $routeParams, $location, alertService) {
        $scope.currUser = AuthToken.getUser();
        var question_id = $routeParams.id;
        $scope.comments = Comment.query({questionId: question_id});
        $scope.question = Question.get({ id: question_id  });

        $scope.postComment = function() {
            Comment.save( { questionId: question_id, content: $scope.cont},  
            function success() {
                //var user = AuthToken.getUser();
                //alertService.add("success", "Vaše odgovor je dodan.",5000);
                $scope.comments = Comment.query({questionId: question_id});
                $scope.cont = null;
            }, 
            function err() {
                alertService.add("danger", "Desila se greška pri unosu.",5000);
            });
        }
    }
]);

//---------------------------------- MANAGEMENT ------------------------------------------


// Feedback admin
controllers.controller('FeedbackCtrl', ['$scope', 'GetFeedback', function($scope, GetFeedback) {
  $scope.feedbacks = GetFeedback.all();
        $scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.feedbacks, function (feedback) {
            feedback.Selected = $scope.selectedAll;
        });
    }
}]);

// User management searching
controllers.controller('SearchUsersControler', ['$scope', 'GetRole', 'GetUser', 'GetMeUser', 'SharedUser', 'UpdateUserByManager', '$location',
    function($scope, GetRole, GetUser, GetMeUser, SharedUser, UpdateUserByManager, $location) {
        $scope.roles = GetRole.all();
        $scope.users = GetUser.all(); 
        

        $scope.deleteUser = function(id, idx) {
            $scope.users.splice(idx, 1);
             return GetUser.delete(id);
        };

        
        $scope.openUpdateUser = function(id, idx) {
            
            $scope.users.splice(idx, 1);
            var obj = new Object();
            obj.user = GetMeUser.dajUsera({id: id},
                function success() {
                SharedUser.set(obj.user);
                //var jsonString = JSON.stringify(Korisnik.get());
                //alert(jsonString);
                $location.path('/edit_user_by_manager');
            }, 
            function err() {
                alert('Došlo je do greške!');
            }
            );
        };

        $scope.banUser = function(id, idx) {
            
            $scope.users.splice(idx, 1);
            var obj = new Object();
            obj.user = GetMeUser.dajUsera({id: id},
                function success() {
                        
                        SharedUser.set(obj.user);
                        $scope.user = SharedUser.get();

                        var obj2 = new Object();
                        obj2.name = $scope.user.name;
                        obj2.surname = $scope.user.surname;
                        obj2.role_id = $scope.user.role_id;
                        obj2.phone = $scope.user.phone;
                        obj2.job = $scope.user.job;
                        obj2.email = $scope.user.email;
                        obj2.adress = $scope.user.adress;
                        obj2.confirmed = 'B';

                        var jsonString= JSON.stringify(obj2);

                        // Moze se iskoristiti vec implementirana metoda za update podataka o useru
                        UpdateUserByManager.update({ id:id }, jsonString, 
                            function success() {
                                alert('Korisnik ' + $scope.user.name + ' je banovan.');
                                SharedUser.set('');
                                // Reloadaj fino podatke u listu
                                $scope.users = GetUser.all(); 
                                $location.path('/user_management'); 
                            }, 
                            function err() {
                                alert('Došlo je do tehničke greške prilikom banovanja korisnika!');
                                $location.path('/user_management'); 
                            });
            }, 
            function err() {
                alert('Došlo je do tehničke greške prilikom banovanja korisnika!');
            });
        };

        $scope.unbanUser = function(id, idx) {
            
            $scope.users.splice(idx, 1);
            var obj = new Object();
            obj.user = GetMeUser.dajUsera({id: id},
                function success() {
                        
                        SharedUser.set(obj.user);
                        $scope.user = SharedUser.get();

                        var obj2 = new Object();
                        obj2.name = $scope.user.name;
                        obj2.surname = $scope.user.surname;
                        obj2.role_id = $scope.user.role_id;
                        obj2.phone = $scope.user.phone;
                        obj2.job = $scope.user.job;
                        obj2.email = $scope.user.email;
                        obj2.adress = $scope.user.adress;
                        obj2.confirmed = 'Y';

                        var jsonString= JSON.stringify(obj2);

                        UpdateUserByManager.update({ id:id }, jsonString, 
                            function success() {
                                alert('Korisnik ' + $scope.user.name + ' je unbanovan.');
                                SharedUser.set('');
                                // Reloadaj fino podatke u listu
                                $scope.users = GetUser.all(); 
                                $location.path('/user_management'); 
                            }, 
                            function err() {
                                alert('Došlo je do tehničke greške prilikom unbanovanja korisnika!');
                                $location.path('/user_management'); 
                            });
            }, 
            function err() {
                alert('Došlo je do tehničke greške prilikom unbanovanja korisnika!');
            });
        };
}]);

// Task controller
controllers.controller('TasksController', ['$scope', 'alertService','Category', 'User', 'Question', 'DeleteQuestion','AuthToken','$location',
    function($scope, alertService, Category, User, Question, DeleteQuestion, AuthToken, $location) {
      $scope.categories = Category.query();
      $scope.users = User.query();
      $scope.questions = Question.query();
      $scope.top_questions = Question.query({filter: "Top"});
      $scope.question = new Question();
      $scope.createQuestion = function() {
        $scope.question.category_id = $scope.category.id;
        $scope.question.uposlenik_id = $scope.user.id;
        Question.save($scope.question,
            function success() {
                var user = AuthToken.getUser();
                alertService.add("success", "Vaš zadatak je dodan.", 5000);
                $location.path('/tasks');
                $scope.question= null;
            }, 
            function err() {
                alertService.add("danger", "Desila se greška pri unosu.", 5000);
                $location.path('/add_task');
            });
      }
      $scope.newQuestion = function() {
        $location.path('/add_task');
      }
      $scope.openQuestions = function() {
        $location.path('/tasks');
      }
      $scope.openTask = function() {
        $location.path('/questions');
      }
      $scope.showQuestion = function(question_id) {
        $location.path('/tasks/'+question_id);
      }
      // ne radi
      $scope.deleteQuestion= function(id, idx) {
        $scope.questions.splice(idx, 1);
        DeleteQuestion.destroy({id: id},
            function success() {
                alert("Izbrisano");
                $location.path('/tasks');
            }, 
            function err() {
                alert('Greška!');
            });
      }
}]);

// User management - editing data about user
controllers.controller('EditUserByManagerController', ['$scope', 'SharedUser', 'GetRole', 'UpdateUserByManager', '$location',
    function($scope, SharedUser, GetRole, UpdateUserByManager, $location) {
        
        $scope.roles = GetRole.all(); 
        $scope.user = SharedUser.get();
        // Provjera :
        //var jsonString = JSON.stringify(SharedUser.get());
        //alert(jsonString);
        //$scope.role = $scope.user.role_id;
        $scope.editUser = function() {
        // Provjera da li u scopeu ima shareovanog usera
        //var jsonString= JSON.stringify($scope.user);
        //alert(jsonString);

        $scope.user.role_id = $scope.role.id;
            
        var obj = new Object();
        obj.name = $scope.user.name;
        obj.surname = $scope.user.surname;
        obj.role_id = $scope.user.role_id;
        obj.phone = $scope.user.phone;
        obj.job = $scope.user.job;
        obj.email = $scope.user.email;
        obj.adress = $scope.user.adress;
        obj.confirmed = $scope.user.confirmed;
        var jsonString= JSON.stringify(obj);
        //alert(jsonString);
        // Posto se radi o metodi PUT, na ovaj nacin se prosljedjuje id, a zatim i objekat (u nasem slucaju json)
        UpdateUserByManager.update({ id:$scope.user.id }, jsonString, 
            function success() {
                alert('Podaci o korisniku su uspješno izmijenjeni.');
                SharedUser.set('');
                $location.path('/user_management'); 
                // TBD SharedUser set to null
            }, 
            function err() {
                alert('Došlo je do tehničke greške.');
                $location.path('/edit_user_by_manager');
            });
        };


}]);

controllers.controller('EditReservationController', ['$scope', 'AuthToken','SharedReservation', 'GetUser', 'UpdateReservation', '$location',
    function($scope, AuthToken, SharedReservation, GetUser, UpdateReservation, $location) {
        
        $scope.users = GetUser.all();
        $scope.reservation = SharedReservation.get();
        $scope.forms = ['Prihvaćen','Odbijen'];
        $scope.dt = new Date();
        $scope.dt = $scope.reservation.appointment_date;
        $scope.mytime = new Date();
        $scope.mytime = $scope.reservation.appointment_date;
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.ismeridian = false;
        //console.log(h);
        $scope.editReservation = function(stat) {
            var obj = new Object();
            if($scope.reservation.form == "Prihvaćen"){
                obj.status = "Y";    
            }
            else{
                obj.status = $scope.reservation.status;
            }
            obj.confirm_date = new Date();//$scope.reservation.confirm_date;
            obj.description = $scope.reservation.description;
            obj.user_receive_id = AuthToken.getUserId();
            obj.user_doctor_id = $scope.user.id;   
            var d = new Date();
            d = $scope.reservation.appointment_date;
            d = $scope.dt;
            var hours = $scope.mytime.getHours();
            var minutes = $scope.mytime.getMinutes();
            console.log(hours);
            d.setHours( hours );
            d.setMinutes( minutes );
            //$scope.mytime = d;
            obj.appointment_date = d;
            /*var hours = $scope.mytime.getHours();
            var minutes = $scope.mytime.getMinutes();
            obj.appointment_date.setHours(hours);
            obj.appointment_date.setMinutes(minutes);*/
            var jsonString= JSON.stringify(obj);

        UpdateReservation.update({ id:$scope.reservation.id }, jsonString, 
            function success() {
                //alert('Rezervacija je uspješno sačuvana.');
                SharedReservation.set('');
                $location.path('/sestra'); 
                // TBD SharedUser set to null
            }, 
            function err() {
               // alert('Došlo je do tehničke greške.');
                $location.path('/edit_reservation');
            });
        };
$scope.today = function() {
    $scope.dt = new Date();
  };
  //$scope.today();

  $scope.clear = function () {
    $scope.dt = null;
     $scope.mytime = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);
      //var dayToCheck = $scope.reservation.appointment_date;
      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
        //var currentDay = $scope.reservation.appointment_date;
        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };


 
  $scope.update = function() {
    var d = new Date();
    d.setHours( 8 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
   // $log.log('Time changed to: ' + $scope.mytime);
  };

}]);

// Category management searching
controllers.controller('SearchCategoriesControler', ['$scope', 'GetCategory', 
    function($scope, GetCategory) {

        $scope.categories = GetCategory.all(); 

        $scope.deleteCategory = function(id, idx) {
            $scope.categories.splice(idx, 1);
             return GetCategory.delete(id);
        };
     }
]);

// Role management searching
controllers.controller('SearchRoleControler', ['$scope', 'GetRole','UpdateRole',
    function($scope, GetRole,UpdateRole) {

        $scope.roles = GetRole.all(); 

        $scope.deleteRole = function(id, idx) {
            $scope.roles.splice(idx, 1);
             return GetRole.delete(id);
        };


        $scope.updateRole = function() {
         UpdateRole.update ({name: $scope.role.name, 
         description: $scope.role.description}, 
            function success() {
                alert("Rola uspješno izmijenjena!");
                $location.path('/role_admin');
            }, 
            function err(){
                alert("Pogrešni podaci!"); 
                $location.path('/add_new_role');
             });
        }
}
    
]);

controllers.controller('UpdateRoleControler', ['$scope', 'UpdateRole','GetRole','$location',
function($scope, UpdateRole,GetRole,$location) {
        $scope.updateRoleRead = function(id) {
            $location.path('/edit_role/'+id);
        } 
}
]);
controllers.controller('UpdateRoleControler2', ['alertService','$routeParams','Role','$scope', 'UpdateRole','GetRole','$location',
function(alertService, $routeParams, Role, $scope, UpdateRole,GetRole,$location) {
     var roleId = $routeParams.id;
     $scope.role = Role.get({ id: roleId  });
    $scope.updateRoleR = function( ) {
         UpdateRole.update ({ id: roleId  ,name: $scope.role.name, 
         description: $scope.role.description}, 
            function success() {
                alertService.add("success", "Rola uspješno izmijenjena!",5000);
                $location.path('/role_admin');
            }, 
            function err(){
                alertService.add("danger", "Pogrešni podaci!");
                $location.path('/role_admin');
             });
             
        }  
}
]);
//Update category
controllers.controller('UpdateCategoryController', ['$routeParams','$scope','UpdateCategory', '$location','Category',
    function($routeParams,$scope,UpdateCategory,$location,Category) {
        $scope.updateCategoryRead = function(c_id) {
            $location.path('/update_category/'+c_id);
        }
    }
    ]);
controllers.controller('UpdateCategoryController2', ['alertService','$routeParams','$scope','UpdateCategory', '$location','Category',
    function(alertService,$routeParams,$scope,UpdateCategory,$location,Category) {
        var categoryId = $routeParams.id;
        $scope.category = Category.get({ id: categoryId  });
        $scope.updateCategoryC = function() {
            UpdateCategory.update ({id: categoryId, name: $scope.category.name, description: $scope.category.description}, 
            function success() {
                alertService.add("success", "Projekat uspješno izmijenjen!",5000);
                $location.path('/category_admin');
            }, 
            function err(){
                $location.path('/category_admin ');
                alertService.add("danger", "Pogrešni podaci!");
             });
        }
    }
    ]);


//Registration users from manager - Possible add role!
controllers.controller('RegistrationUserByManagerController', ['$scope','UserRegister', 'GetRole', '$location',
    function($scope, UserRegister, GetRole, $location){

        $scope.roles = GetRole.all(); 

        $scope.registerUserWithRole = function() {
            $location.path('/register_user_by_manager');
        }

        $scope.registerUser = function(){
            $scope.user.role_id = $scope.role.id;
            UserRegister.register({user: $scope.user},
                function success() {
                    alert("Korisnik je dužan potvrditi registraciju preko email-a, a zatim izvršiti reset passworda preko istog emaila.");
                    $location.path('/user_management');
                }, 
                function err() {
                alert('Pogrešni podaci!');
                $location.path('/register_user_by_manager');
            });
        }
}]);

// User management searching
controllers.controller('SearchReservationsControler', ['$scope', 'GetReservation', 'GetMeReservation', 'SharedReservation', '$location',
    function($scope, GetReservation, GetMeReservation, SharedReservation, $location) {
        //$scope.roles = GetRole.all();
        $scope.reservations = GetReservation.all(); 
        
        $scope.deleteReservation = function(id, idx) {
            $scope.reservations.splice(idx, 1);
             return GetReservation.delete(id);
        };

        $scope.openUpdateReservation = function(id, idx) {
            
            $scope.reservations.splice(idx, 1);
            var obj = new Object();
            obj.reservation = GetMeReservation.dajRezervaciju({id: id},
                function success() {
                SharedReservation.set(obj.reservation);
                $location.path('/edit_reservation');
            }, 
            function err() {
                alert('Došlo je do greške!');
            }
            );
        };

}]);


// Create category
controllers.controller('CreateCategoryControllerByAdmin', ['$scope','CreateCategory', '$location',

    function($scope,CreateCategory,$location) {

        $scope.createCategoryByAdmin = function() {
            $location.path('/new_category');
        }

        $scope.createCategoryC = function(){
         CreateCategory.create ({name: $scope.category.name, 
         description: $scope.category.description}, 
            function success() {
                alert("Projekat uspješno kreiran!");
                $location.path('/category_admin');
            }, 
            function err(){
                alert("Pogrešni podaci!"); 
                $location.path('/new_category');
             });
        }
    }
]);

//controller for star rating - feedback direcitive
controllers.controller('RatingCtrl', function($scope) {
    $scope.rating = 5;
    $scope.rateFunction = function(rating) {
     // alert('Rating selected - ' + rating);
    };
});
//controller for file upload
controllers.controller('NewResourceCtrl', ['$scope', 'uploadsFactory', '$location', 'FileUploader', '$routeParams',
  function($scope, uploadsFactory, $location, FileUploader, $routeParams) {
  $scope.title = "RESOURCES";
  $scope.uploader = new FileUploader({url: '/api/questions/' + $routeParams.id + '/uploads'});

  $scope.upload = function() {
    $scope.uploader.uploadItem(0);
    $location.path('/questions/' + $routeParams.id);
  }
}]);

//controller for uploaded files
/*controllers.controller('ResourcesCtrl', ['$scope', 'uploadsFactory', '$routeParams', function($scope, uploadsFactory, $routeParams) {
  $scope.title = "RESOURCES";
  $scope.question_id = $routeParams.id;

  uploadsFactory.all($routeParams.id)
  .success(function(data) {
    console.log(data);
    $scope.resources = data.document.resources;
  });
}]);
*/

//controller for get uploaded files
controllers.controller('ResourcesCtrl', ['$scope', 'GetUpload', '$routeParams', function($scope, GetUpload, $routeParams) {
  $scope.title = "RESOURCES";
  $scope.question_id = $routeParams.id;
  $scope.uploads = GetUpload.all($routeParams.id);

  
}]);
//Charts controller - Feedback
controllers.controller('ChartsController', ['$scope','GetFeedback', 'GetCategory', 'GetQuestion', '$location', 
    function($scope, GetFeedback, GetCategory, GetQuestion, $location) {
        $scope.data_pie = GetFeedback.chart();
        $scope.options_pie = {
            chart: {
                type: 'pieChart',
                height: 400,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                labelType: 'percent',
                pie: {},
                donut: true,
                donutRatio: 0.35,
                transitionDuration: 500,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 0,
                        left: 0
                    }
                }
            }
    };
    $scope.data_multibar = GetCategory.chart();
    $scope.options_multibar = {
        chart: {
                type: 'multiBarHorizontalChart',
                height: 300,
                width: 1100,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 150
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: true,
                showValues: true,
                transitionDuration: 500,
                tooltips: false,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Broj zadataka',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
    }

    $scope.data_discretebar = GetQuestion.chart();
    $scope.options_discretebar = {
        chart: {
                type: 'discreteBarChart',
                height: 300,
                width: 1100,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: true,
                showValues: true,
                transitionDuration: 500,
                tooltips: false,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Broj komentara',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
    }

    $scope.data_historical = GetQuestion.chart();
    $scope.options_historical = {
            chart: {      
                type: 'historicalBarChart',
                height: 450,
                width: 1100,
                margin : {
                    top: 20,
                    right: 50,
                    bottom: 100,
                    left: 50
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.2f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                       return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 50,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 35,
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
               } 
    }
}]);