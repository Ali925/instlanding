import { Component } from '@angular/core';
import { InstagramService } from './instagram.service';
import { OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username = '';
	fullname = '';
	profile_pic = '';
	user_bio = '';
	nextMaxId = '';
	user_counts = {
		followed_by: 0,
 		follows: 0,
		media: 0
	};
	images = [];
	isLoadMore = false;
	isLoadingMore = false;
	isFollow = false;
	isFollowButtonCLicked = false;
	isSignedIn = false;
	iframeSrcUrl:string = 'about:blank';
	
	constructor(private instService: InstagramService) {}
	
	ngOnInit(): void {
		let self = this;
		this.instService.getStatus()
			.then(function succesCallback(data){
				if(data.url){
					self.isSignedIn = false;
					self.startOfflineApp();
				} else {
					if(self.instService.authUser() == 'ok'){
						self.isSignedIn = true;
						self.startApp();
					}
				}
		},function errorCallback(error){
			console.log(error);
		});
	}
	
	@HostListener('window:scroll', [])
	onWindowScroll() {
			let self = this;

			if ((document.body.scrollHeight < document.body.scrollTop + window.innerHeight + 120) && self.nextMaxId && !self.isLoadMore && !self.isLoadingMore) {
					self.isLoadingMore = true;
					self.loadMore();
			} 
	}
	
	startApp(): void {
		let self = this;
		this.instService.getUserInfo()
			.then(function succesCallback(data){
				console.log(data);
				self.username = data._body.data.username;
				self.fullname = data._body.data.full_name;
				self.profile_pic = data._body.data.profile_picture;
				self.user_bio = data._body.data.bio;
				self.user_counts.followed_by = data._body.data.counts.followed_by;
				self.user_counts.media = data._body.data.counts.media;
				self.user_counts.follows = data._body.data.counts.follows;
				self.instService.getUserImages()
						.then(function succesCallback(res){
							console.log(res);
							self.instService.setNextMaxID(res._body.pagination.next_max_id);
							self.nextMaxId = res._body.pagination.next_max_id;
							if(res._body.pagination.next_max_id)
								self.isLoadMore = true;
							else
								self.isLoadMore = false;
					
							var n = -1;
							for(let i in res._body.data){
								if(parseInt(i)%3 == 0){
									n++;
									self.images[n] = [];
								}
								
								self.images[n].push(res._body.data[i]); 
							}
					
							self.instService.isUserFollow()
															.then(function successCallback(response){
											console.log(response);
											if(response._body.data.outgoing_status == 'none')
												self.isFollow = false;
											else if(response._body.data.outgoing_status == 'follows')
												self.isFollow = true;
							}, function errorCallback(error){
								console.log(error);
							});
				},function errorCallback(err){
					console.log(err);
				});
		},function errorCallback(error){
			console.log(error);
		});
	}

	startOfflineApp(): void {
		let self = this;
		self.instService.getLatestMedia()
									.then(function succesCallback(res){
											
								let data = JSON.parse(res._body);
								data = JSON.parse(data);
								console.log(data);
			
							self.username = data.items[0].user.username;
							self.fullname = data.items[0].user.full_name;
							self.profile_pic = data.items[0].user.profile_picture;
			
							var n = -1;
							for(let i in data.items){
								if(parseInt(i)%3 == 0){
									n++;
									self.images[n] = [];
								}
								
								self.images[n].push(data.items[i]); 
							}

				},function errorCallback(err){
					console.log(err);
				});
	}	

	logIn(): void {
		this.instService.authUser()
	}

	logOut(): void {
		this.iframeSrcUrl = 'https://instagram.com/accounts/logout/';
		setTimeout(function(){
			window.location.reload();
		}, 2000);
		
	}
	
	loadMore(): void {
		let self = this;
		self.isLoadMore = false;
		self.isLoadingMore = true;
		this.instService.getNextImages()
										.then(function succesCallback(res){
							self.isLoadingMore = false;
							console.log(res);
							self.instService.setNextMaxID(res._body.pagination.next_max_id);
							self.nextMaxId = res._body.pagination.next_max_id;
							var n = self.images.length - 1;
			
							for(let i in res._body.data){
								if(parseInt(i)%3 == 0){
									n++;
									self.images[n] = [];
								}
								
								self.images[n].push(res._body.data[i]); 
							}
							
				},function errorCallback(err){
					console.log(err);
				});
	}

	followUnfollow(action: string): void {
		let self = this;
		
		if(!self.isFollowButtonCLicked){
			self.instService.followUnfollow(action)
																.then(function successCallback(response){
												self.isFollowButtonCLicked = false;
												console.log(response);
												let body = JSON.parse(response._body);
												body = JSON.parse(body);
												if(body.data.outgoing_status == 'none')
													self.isFollow = false;
												else if(body.data.outgoing_status == 'follows')
													self.isFollow = true;
								}, function errorCallback(error){
									console.log(error);
									self.isFollowButtonCLicked = false;
								});
		}
		
		self.isFollowButtonCLicked = true;
	}

}
