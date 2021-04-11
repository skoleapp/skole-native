//
//  skoleUITests.swift
//  skoleUITests
//
//  Created by Markus Blomqvist on 11.4.2021.
//

import XCTest

class skoleUITests: XCTestCase {
    var app: XCUIApplication!
  
    override func setUpWithError() throws {
        continueAfterFailure = false
      
        app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
    }
  
    func testTakeScreenshots() {
      snapshot("01LandingPage")
      let webViews = app.webViews
      webViews.buttons.element.tap()
      webViews.links.allElementsBoundByIndex[0].tap()
      webViews.textFields.element.tap()
      webViews.textFields.element.typeText("student22")
      webViews.secureTextFields.element.tap()
      webViews.secureTextFields.element.typeText("testpass123")
      webViews.buttons["LOG IN"].tap()
      snapshot("02HomePage")
      webViews.buttons["Profile"].tap()
      snapshot("03ProfilePage")
    }
}
