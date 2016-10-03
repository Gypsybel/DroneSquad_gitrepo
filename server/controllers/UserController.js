var mongoose = require('mongoose');
var Request = require('request');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var Meetup = mongoose.model('Meetup');
var Url = require('url');

module.exports = {

  getLoggedUser: function(req, res){
    res.json(req.session.user);
  },

  register: function(req,res){
		var user = new User(req.body);
		user.save(function(err){
			if (err){
        console.log(err);
				res.status(500).send("Users did not save");
			}
      else{
        console.log(user);
  			req.session.user = user;
        res.sendStatus(200);
			}
		});
	},

	login: function (req, res) {
    console.log(req.body);
		User.findOne({email: req.body.email}).exec(function (err, user) {
      console.log('logging error' + err);
      if(user==null){
        console.log("login failed");
        res.status(400).send("Sorry we couldn't find that email address")
      }
      else if(req.body.password != user.password){
        res.status(400).send('Sorry that password does not match what we have on file')
      }
			else if(req.body.password == user.password){
        console.log("login successful");
				req.session.user = user;
        console.log(req.session.user);
				res.sendStatus(200);
			}
		})
	},

  logout: function (req, res) {
    console.log("Logged out the user");
    req.session.destroy();
    res.redirect('/');
  },

  getUsers: function(req, res){
    User.find({}).exec(function(err, users){
      if(err){
        res.status(500).send('There was a problem retrieving all users')
      }
      else{
        res.json(users);
      }
    })
  },

  getGroups: function(req, res){
    Group.find({}).populate('_members').exec(function(err, groups){
      if(err){
        res.status(500).send('There was a problem retrieving all groups.')
      }
      else{
        res.json(groups);
      }
    })
  },

  createGroup: function (req, res) {
    var group = new Group(req.body);
    group._organizers.push(req.session.user._id);
    group._members.push(req.session.user._id);
    group.save( function(err){
      if (err){
        res.status(500).send("Group did not save");
      }
      else{
        console.log(group);
        res.json(group);
      }
    });
  },

  getGroup: function (req, res) {
    console.log(req._parsedOriginalUrl.href);
    Group.findOne({_id:req.params.id}).populate("_organizers").exec(function (err, group){
      if (err){
        res.status(500).send("Had trouble finding group");
      }
      else{
          req.session.group = group;
          res.json(group);
          }
      });
  },

  addMeetup: function (req, res) {
    var meetup = new Meetup(req.body);
    meetup._group = req.params.id;
    meetup.save(function(err){
      if (err){
        console.log(err);
        res.status(500).send("New Meetup did not save"+err);
      }
      else{
        console.log(meetup);
        res.sendStatus(200);
      }
    });
  },

  getMeetups: function (req, res) {
    Meetup.find({_group: req.params.id}, function(err, meetups){
      if (err){
        res.status(500).send("Had trouble finding meetups");
      }
      else{
        res.json(meetups);
      }
    });
  },

  getAllMeetups: function(req, res){
    Meetup.find({}).populate("_group").exec(function(err, meetups){
      if(err){
        res.status(500).send('There was a problem retrieving all meetups.')
      }
      else{
        res.json(meetups);
      }
    })
  },

  instagramauth: function(req, res){
    console.log(req);
    res.json(req);
  },

  updateInstagram: function(req, res){
    // var temp = Url.parse(req.url)
	console.log('update insta running');
	if(req.query == null){
		res.redirect('/#/group/req.session.group._id');
	}
    console.log(req.query);
    console.log(req.query.code);
    var Code = req.query.code;
    var data = {
      client_secret: '75e70f094dce44eaa9c2b35c731b8a2e',
      client_id: 'ed0b913c94f94440baf6218a95fa4ebf',
      grant_type: 'authorization_code',
      redirect_uri: 'http://www.partyhard24-7.com/instagram/',
      code: Code,
    };
    Request({
      method: 'POST',
      url: 'https://api.instagram.com/oauth/access_token',
      form: data,
    }, function(error, response, body){
      if(error){
        console.log(error);
        res.json(error);
      }
      else{
	var parsedBody = JSON.parse(body);
        var token = parsedBody['access_token'];
	console.log("parsed body follows");
	console.log(parsedBody);
	console.log('parsedBody.user follows');
	console.log(parsedBody.user);
	console.log("parsedBody.user['profile_picture']");
	console.log(parsedBody.user['profile_picture']);
        var profile = parsedBody.user['profile_picture'];
        Group.update({_id:req.session.group._id}, {$set: {instagram_token: token, image_url: profile}}, function(err){
          if (err) {
            console.log("had trouble updating instagram_token" + err);
          }
          else {
		console.log('updated insta info!');
            res.redirect('/#/group/'+req.session.group._id);
          }
        })
      }
    });

  },

  joinGroup: function (req, res) {
    console.log("Made it to User Controller Join Group");
    console.log('**************'+req.body);
    Group.findOne({_id:req.body.data}, function (err, group){
      if(err){
        res.status(500).send("Had trouble finding group")
      } else{
        console.log(group);
        group._members.push(req.params.userid);
        group.save(function(err) {
          if(err){
            res.status(500).send("did not join group")
          } else{
            res.sendStatus(200);
            }
          })
        }
      });
    },

    getUsers: function (req, res) {
      User.find({}, function(err, users){
        if (err) {
          res.status(500).send('Had trouble getting all users')
        }
        else {
          res.json(users);
        }
      })
    },

    deleteUser: function (req, res) {
      var id = req.params.id;
      User.remove({_id: id}, function(err){
        if (err) {
          res.status(500).send('Had trouble deleting user')
        }
        else {
          Group.find({}, function(err, groups){
            if (err) {
              res.status(500).send('Had trouble finding all groups while deleting user');
            }
            else {
              for(var x = 0; x<groups.length; x++){
                var tempArr = [];
                var tempOrgs = [];
                for(var i = 0; i<groups[x]._members.length; i++){
                  if(groups[x]._members[i]!=id){
                    tempArr.push(groups[x]._members[i])
                  }
                }
                for(var i = 0; i<groups[x]._organizers.length; i++){
                  if(groups[x]._organizers[i]!=id){
                    tempOrgs.push(groups[x]._organizers[i])
                  }
                }
                groups[x]._organizers = tempOrgs;
                groups[x]._members = tempArr;
                groups[x].save(function(err){
                  if (err) {
                    res.status(500).send('Had trouble saving group in delete user');
                  }
                  else{
                    console.log('saved group');
                  }
                });
                if (groups[x]._organizers.length==0) {
                  Group.remove({_id: groups[x]._id}, function(err){
                    if (err) {
                      res.status(500).send('Had trouble deleting group in delete user');
                    }
                    else{
                      console.log('deleted group');
                    }
                  })
                }
              }
              Meetup.find({}, function(err, meetups){
                if (err) {
                  res.status(500).send('Had trouble finding all meetups in delete user');
                }
                if (!meetups.length) {
                  console.log('no meetups');
                }
                else {
                  for (var y = 0; y<meetups.length; y++) {
                    console.log('checked meetup');
                    if (meetups[y]._organizers[0]==id) {
                      Meetup.remove({_id: meetups[y]._id}, function(err){
                        if (err) {
                          res.status(500).send('Had trouble deleting meetup in delete user');
                        }
                        else {
                          console.log('removed meetup');
                          res.status(200).send('successfully removed meetup')
                        }
                      })
                    }
                  }
                }
              })
            }
          });
        }
      })
    },

}
